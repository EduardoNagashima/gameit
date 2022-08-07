import { Router } from "express";
import { signIn, signUp } from "../controllers/userController.js";
import { signUpValidation } from "../middlewares/validationMiddleware.js";

const userRouter = Router();

userRouter.post('/signup', signUpValidation, signUp);
userRouter.post('/signIn', signUpValidation, signIn);

export default userRouter;