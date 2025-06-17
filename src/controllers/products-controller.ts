import { NextFunction, Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { z } from "zod";
import { knex } from "@/database/knex";

class ProductsController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { name } = request.query;
      const products = await knex<ProductRepository>("products")
        .select()
        .whereLike("name", `%${name ?? ""}%`)
        .orderBy("name");

      return response.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string({ required_error: "Name is required" }).trim().min(6),
        price: z.number().gt(0, { message: "Price must be greater than 0" }),
      });

      const { name, price } = bodySchema.parse(request.body);

      // coloca os dados no banco de dados
      await knex<ProductRepository>("products").insert({ name, price });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {

      // garante que o id é um número
      const id = z
      .string()
      .transform((value) =>Number(value))
      .refine((value) => !isNaN(value), { message: "Id must be a number" })
      .parse(request.params.id)

      const bodySchema = z.object({
        name: z.string({ required_error: "Name is required" }).trim().min(6),
        price: z.number().gt(0, { message: "Price must be greater than 0" }),
      });

      const { name, price } = bodySchema.parse(request.body);

      await knex<ProductRepository>("products")
        .update({ name, price, updated_at:knex.fn.now() }).where({ id });

      return response.json();
    } catch (error) {
      next(error);
    }
  }
}

export { ProductsController };
