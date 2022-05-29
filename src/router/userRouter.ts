import { Router } from "express";
import bodyParser from "body-parser";
import userController from "@controllers/user/UserController";

const userRouter = Router();

userRouter.post(
  "/signup",
  bodyParser.urlencoded({ extended: true }),
  userController.signup
);

userRouter.post(
  "/login",
  bodyParser.urlencoded({ extended: true }),
  userController.login
);

userRouter.get("/auth", userController.auth);

userRouter.get("/logout", userController.logout);

userRouter.get("/users", userController.getUserList);

userRouter.get("/users/searchByName", userController.searchByName);

userRouter.get("/users/:id", userController.getUser);

export default userRouter;
