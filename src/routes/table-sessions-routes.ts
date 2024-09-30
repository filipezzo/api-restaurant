import { TableSessionController } from "@/controllers/tables-session-controller";
import { Router } from "express";

const tableSessionRoutes = Router();

const tableSessionController = new TableSessionController();

tableSessionRoutes.get("/", tableSessionController.index);
tableSessionRoutes.patch("/:id", tableSessionController.update);
tableSessionRoutes.post("/", tableSessionController.create);

export { tableSessionRoutes };
