import { ProductsController } from "@/controllers/products-controller";
import { Router } from "express";

const productsRoutes = Router();

const produductsController = new ProductsController

productsRoutes.get("/", produductsController.index);


export { productsRoutes };