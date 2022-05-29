import { Router } from "express";
import userRouter from "@router/userRouter";
import trainRouter from "@router/trainRouter";
import { auth } from "@middleware/auth";

const router = Router();

router.use(auth);
router.use(userRouter);
router.use(trainRouter);

router.get("/", (_, res) => {
  res.json("FunTennis server!");
});

export default router;
