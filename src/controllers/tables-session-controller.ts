import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";
import z from "zod";

class TableSessionController {
  async index(request: Request, response: Response, next: NextFunction) {
    const tables = await knex<TableSessionRepo>("table_sessions")
      .select()
      .orderBy("table_id");

    return response.json(tables);
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.number(),
      });

      const { table_id } = bodySchema.parse(request.body);

      const session = await knex<TableSessionRepo>("table_sessions")
        .select()
        .where({ table_id })
        .orderBy("opened_at", "desc")
        .first();

      if (session && !session.closed_at) {
        throw new AppError("Table already opened!");
      }

      await knex<TableSessionRepo>("table_sessions").insert({
        table_id,
        opened_at: knex.fn.now(),
      });
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
        .refine((value) => !isNaN(value))
        .parse(request.params.id);

      const session = await knex<TableSessionRepo>("table_sessions")
        .select()
        .where({ id })
        .first();

      if (!session) {
        throw new AppError("Session not found");
      }

      if (session.closed_at) {
        throw new AppError("Table already Closed");
      }

      await knex<TableSessionRepo>("table_sessions")
        .update({
          closed_at: knex.fn.now(),
        })
        .where({ id });

      return response.json();
    } catch (error) {
      next(error);
    }
  }
}

export { TableSessionController };
