import express from "express";
import routes from "../routes";
import { registerView } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.get(routes.registaerView, registerView);

export default apiRouter;
