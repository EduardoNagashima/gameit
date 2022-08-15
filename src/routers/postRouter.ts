import { Router } from "express";
import { post, getMostViews, getPosts, getPost, like, deletePost } from "../controllers/postController.js";
import { tokenValidation, postValidation } from "../middlewares/validationMiddleware.js";

const postRouter = Router();

postRouter.use(tokenValidation);
postRouter.post('/post', postValidation, post);
postRouter.get('/posts', getPosts);
postRouter.get('/post/mostviews', getMostViews);
postRouter.post('/like', like);
postRouter.get('/post/:id', getPost);
postRouter.delete('/post/:id', deletePost)

export default postRouter;