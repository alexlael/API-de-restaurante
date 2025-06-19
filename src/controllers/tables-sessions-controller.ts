import { NextFunction, Request, Response } from "express";
import { knex } from "@/database/knex";
import { z } from "zod";
import { AppError } from "@/utils/AppError";
import { table } from "console";

class TablesSessionsController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.number(),
      });

      const { table_id } = bodySchema.parse(request.body);

      //verificando se a mesa já está aberta
      const session = await knex<TablesSessionsRespository>("tables_sessions")
        .where({ table_id })
        .orderBy("opened_at", "desc")
        .first();

      if (session && !session.closed_at) {
        throw new AppError("Mesa já está aberta");
      }

      // abrindo a mesa
      await knex<TablesSessionsRespository>("tables_sessions").insert({
        table_id,
        opened_at: knex.fn.now(),
      });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const sessions = await knex<TablesSessionsRespository>(
        "tables_sessions"
      ).orderBy("closed_at");

      return response.status(200).json(sessions);
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), {
          message: "ID inválido",
        })
        .parse(request.params.id);

      const session = await knex<TablesSessionsRespository>("tables_sessions")
        .where({ id })
        .first();

      if (!session) {
        throw new AppError("Sessão não encontrada");
      }

      if (session.closed_at) {
        throw new AppError("Sessão já foi fechada");
      }

      await knex<TablesSessionsRespository>("tables_sessions")
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

export { TablesSessionsController };
