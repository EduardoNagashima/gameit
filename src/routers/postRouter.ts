import { Router } from "express";
import { post, like, deletePost } from "../controllers/postController.js";
import { tokenValidation, postValidation } from "../middlewares/validationMiddleware.js";

const postRouter = Router();

postRouter.use(tokenValidation);
postRouter.post('/post', postValidation, post);
postRouter.post('/like', like)
postRouter.delete('/post/:id', deletePost)

export default postRouter;