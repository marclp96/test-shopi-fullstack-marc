import { Router } from "express";
import { settingsController } from "../controllers/index.js";

const settingsRouter = Router();

settingsRouter.get("/:type", settingsController.get);
settingsRouter.post("/", settingsController.set);

export { settingsRouter };
