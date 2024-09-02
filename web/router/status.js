import { Router } from "express";
import { statusController } from "../controllers/index.js";

const statusRouter = Router();

statusRouter.get("/", statusController.summary);

export { statusRouter };
