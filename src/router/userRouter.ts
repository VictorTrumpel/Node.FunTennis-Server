import { Router } from "express";
import bodyParser from "body-parser";
import { UserController } from "@controllers/UserController";

const userController = new UserController();

const userRouter = Router();

userRouter.post(
  "/signup",
  bodyParser.urlencoded({ extended: true }),
  userController.signup.bind(userController)
);

export default userRouter;
