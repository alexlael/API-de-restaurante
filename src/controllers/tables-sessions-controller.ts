import { NextFunction, Request, Response } from "express";

class TablesSessionsController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
           
            return response.status(201).json({ message: "Session created" });
        } catch (error) {
            next(error);
        }
    }

}

export { TablesSessionsController };