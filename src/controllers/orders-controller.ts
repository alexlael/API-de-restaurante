import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "@/utils/AppError";
import { knex } from "@/database/knex";

class OrdersController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_session_id: z.number(),
        product_id: z.number(),
        quantity: z.number(),
      });

      const { table_session_id, product_id, quantity } = bodySchema.parse(
        request.body
      );

      const session = await knex<TablesSessionsRespository>("tables_sessions")
        .where({ id: table_session_id })
        .first();

      if (!session) {
        throw new AppError("Table session not found");
      }

      if (session.closed_at) {
        throw new AppError("Table session is already closed");
      }

      const product = await knex<ProductRepository>("products")
        .where({ id: product_id })
        .first();

      return response.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
}

export { OrdersController };
