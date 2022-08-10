import { Request, Response } from "express";
import postService from "../services/postService.js";

export async function post(req: Request, res: Response) {
    const { post } = res.locals;
    await postService.create(post);

    res.sendStatus(201);
}

export async function like(req: Request, res: Response) {
    const like = req.body;
    const { userId } = res.locals;
    await postService.like({ ...like, userId });
    res.sendStatus(200);
}

export async function deletePost(req: Request, res: Response) {
    const { id } = req.params;
    const { userId } = res.locals;
    await postService.deletePost(parseInt(id), Number(userId));
    res.sendStatus(204)
}