import { NextFunction, Request, Response } from "express";
import { AppError } from "@/utils/AppError";

class ProductsController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      
      throw new AppError("This is a custom error message", 400);
      return response.status(200).json({messsage: "ok"});
    } catch (error) {
      next(error);
    }
  }
}


export { ProductsController }