import { Router } from "express";
import { post, like } from "../controllers/postController.js";
import { tokenValidation, postValidation } from "../middlewares/validationMiddleware.js";

const postRouter = Router();

postRouter.use(tokenValidation);
postRouter.use('/post', postValidation, post);
postRouter.use('/like', like)

export default postRouter;