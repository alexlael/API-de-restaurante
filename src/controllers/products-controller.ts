import { NextFunction, Request, Response } from "express";

class ProductsController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      
    
      return response.status(200).json({messsage: "ok"});
    } catch (error) {
      next(error);
    }
  }
}


export { ProductsController }