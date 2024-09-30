import { NextFunction, Request, Response } from "express";
import { knex } from "../database/knex";

class TableController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const tables = await knex<TableRepo>("tables")
        .select()
        .orderBy("table_number");
      return response.json(tables);
    } catch (error) {
      next(error);
    }
  }
}

export { TableController };
