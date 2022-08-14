import { Router } from "express";
import { post, getPosts, like, deletePost } from "../controllers/postController.js";
import { tokenValidation, postValidation } from "../middlewares/validationMiddleware.js";

const postRouter = Router();

postRouter.use(tokenValidation);
postRouter.post('/post', postValidation, post);
postRouter.get('/posts', getPosts);
postRouter.post('/like', like);
postRouter.delete('/post/:id', deletePost)

export default postRouter;