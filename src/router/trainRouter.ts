import { Router } from "express";
import trainController from "@controllers/train/TrainController";

const trainRouter = Router();

trainRouter.post("/train", trainController.addTrain);

trainRouter.get("/train", trainController.getTrainList);

trainRouter.get("/train/:id", trainController.getTrain);

export default trainRouter;
