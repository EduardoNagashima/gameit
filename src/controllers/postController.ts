import { Request, Response } from "express";
import postService from "../services/postService.js";

export async function post(req: Request, res: Response) {
    const { post } = res.locals;
    await postService.create(post);

    res.sendStatus(201);
}

export async function getPost(req: Request, res: Response) {
    const { id } = req.params;
    const post = await postService.get(parseInt(id));
    res.send(post);
}

export async function getPosts(req: Request, res: Response) {
    const posts = await postService.get();
    res.send(posts);
}

export async function like(req: Request, res: Response) {
    const { postId } = req.body;
    const { userId } = res.locals;
    await postService.like({ postId, userId });
    res.sendStatus(200);
}

export async function deletePost(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = res.locals;
    await postService.deletePost(parseInt(id), Number(userId));
    res.sendStatus(204)
}

export async function getMostViews(req: Request, res: Response) {
    const posts = await postService.getByViews();
    res.send(posts);
}