import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import tokenRepository from "../repositories/tokenRepository.js";
import { userData } from "../services/userService.js";
import { signUpSchema } from "../utils/schemas.js";
dotenv.config();

export function signUpValidation(req: Request, res: Response, next: NextFunction) {
    const userInfo: userData = req.body;
    const { error } = signUpSchema.validate(userInfo);
    if (error) throw { type: 'BAD_REQUEST', message: error.details }
    next();
}

export async function tokenValidation(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!authorization) throw { type: "BAD_REQUEST", message: 'invalid token' };
    const userId = jwt.verify(token, process.env.JWT_SECRET);
    const dbToken = await tokenRepository.findByToken(token);
    if (!dbToken) throw { type: "BAD_REQUEST", message: 'invalid token' };
    res.locals = userId;
    next();
}

export function postValidation(req: Request, res: Response) {

}