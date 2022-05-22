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

userRouter.post(
  "/login",
  bodyParser.urlencoded({ extended: true }),
  userController.login.bind(userController)
);

userRouter.get("/auth", userController.auth.bind(userController));

userRouter.get("/logout", userController.logout.bind(userController));

userRouter.get("/users", userController.getUserList.bind(userController));

export default userRouter;
