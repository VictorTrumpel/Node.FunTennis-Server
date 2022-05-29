import { Router } from "express";
import trainController from "@controllers/train/TrainController";

const trainRouter = Router();

trainRouter.get("/train", trainController.addTrain);

export default trainRouter;
