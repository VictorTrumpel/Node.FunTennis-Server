import { Router } from "express";
import userRouter from "@router/userRouter";
import { auth } from "@middleware/auth";

const router = Router();

router.use(auth);
router.use(userRouter);

router.get("/", (_, res) => {
  res.json("FunTennis server!");
});

export default router;
