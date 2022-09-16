import { Router } from "express";
import postRouter from "./postRouter.js";
import userRouter from "./userRouter.js";
var router = Router();
router.use(userRouter);
router.use(postRouter);
export default router;
