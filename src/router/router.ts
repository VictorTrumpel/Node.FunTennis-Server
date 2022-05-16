import { Router } from "express";
import { auth } from "@middleware/auth";
import userRouter from "@router/userRouter";

const router = Router();

router.use(auth);
router.use(userRouter);

router.get("/", (_, res) => {
  res.json("FunTennis server!");
});

export default router;
