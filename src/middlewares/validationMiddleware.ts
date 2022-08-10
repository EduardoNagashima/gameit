import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import tokenRepository from "../repositories/tokenRepository.js";
import { postSchema } from "../utils/schemas.js";
dotenv.config();

export async function tokenValidation(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!authorization) throw { type: "BAD_REQUEST", message: 'invalid token' };
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const dbToken = await tokenRepository.findByToken(token);
    if (!dbToken) throw { type: "BAD_REQUEST", message: 'invalid token' };
    res.locals.userId = userId;
    next();
}

export function postValidation(req: Request, res: Response, next: NextFunction) {
    let post = req.body;
    const userId = res.locals.userId;
    const { error } = postSchema.validate(post);
    if (error) throw { type: 'BAD_REQUEST', message: error.details };
    post = { ...post, userId }
    res.locals.post = post;
    next();
}