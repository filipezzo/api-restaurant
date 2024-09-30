import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { knex } from "../database/knex";

class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { name } = request.query;
      const products = await knex<ProductRepo>("products")
        .select()
        .whereLike("name", `%${name ?? ""}%`)
        .orderBy("name");
      return response.json(products);
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0),
      });

      const { name, price } = bodySchema.parse(request.body);
      await knex<ProductRepo>("products").insert({ name, price });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((v) => Number(v))
        .refine((v) => !isNaN(v))
        .parse(request.params.id);

      const bodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0),
      });

      const { name, price } = bodySchema.parse(request.body);

      const product = await knex<ProductRepo>("products")
        .select()
        .where({ id })
        .first();

      if (!product) {
        throw new AppError("Product not found");
      }

      await knex<ProductRepo>("products")
        .update({ name, price, updated_at: knex.fn.now() })
        .where({ id });
      return response
        .status(200)
        .json({ message: "Product has been updated!" });
    } catch (error) {
      next(error);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((v) => Number(v))
        .refine((v) => !isNaN(v))
        .parse(request.params.id);

      const product = await knex<ProductRepo>("products")
        .select()
        .where({ id })
        .first();

      if (!product) {
        throw new AppError("Product not found");
      }

      await knex<ProductRepo>("products").delete().where({ id });

      return response.status(200).json({ message: "Product has been deleted" });
    } catch (error) {
      next(error);
    }
  }
}

export { ProductController };
