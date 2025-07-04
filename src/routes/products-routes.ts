import { ProductsController } from "@/controllers/products-controller";
import { Router } from "express";

const productsRoutes = Router();

const produductsController = new ProductsController

productsRoutes.get("/", produductsController.index);
productsRoutes.post("/", produductsController.create);
productsRoutes.put("/:id", produductsController.update);
productsRoutes.delete("/:id", produductsController.remove);


export { productsRoutes };