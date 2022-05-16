import { Router } from "express";
import { auth } from "@middleware/auth";
import userRouter from "./userRouter";

const router = Router();

router.use(auth);
router.use(userRouter);

export default router;
