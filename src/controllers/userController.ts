import { Request, Response } from "express";
import { signInService, signUpService, userData } from "../services/userService.js";

export async function signUp(req: Request, res: Response) {
    const userInfo: userData = req.body;
    await signUpService(userInfo);
    res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
    const userInfo: userData = req.body;
    const token = await signInService(userInfo);
    res.status(200).send(token);
}