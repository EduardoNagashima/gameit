import { User } from "@prisma/client";
import { userRepository } from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import tokenRepository from "../repositories/tokenRepository.js";
import dotenv from "dotenv";
dotenv.config();


export type userData = Omit<User, "id">

export async function signUp(user: userData) {
    const userAlreadyExists = await userRepository.findByEmail(user.email);
    if (userAlreadyExists) throw { type: 'CONFLICT', message: 'Email já está sendo utilizado.' }
    const usernameExist = await userRepository.findByUsername(user.username);
    if (usernameExist) throw { type: 'CONFLICT', message: 'Username já está sendo utilizado.' }
    user.password = bcrypt.hashSync(user.password, 10);
    await userRepository.create(user);
}

export async function signIn(user: userData) {
    const userInfo = await userRepository.findByEmail(user.email);
    if (!userInfo) throw { type: 'NOT_FOUND', message: 'Usuário não encontrado.' };
    const { image, username } = userInfo;
    const correctPassword = bcrypt.compareSync(user.password, userInfo.password);
    if (!userInfo || !correctPassword) throw { type: 'UNAUTHORIZED', message: 'Senha inválida para este usuário.' };
    const token = jwt.sign({ userId: userInfo.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 30 });
    await tokenRepository.create({ token: token, userId: userInfo.id });
    const response = {
        image,
        username,
        token
    }
    return response;
}

export const userService = {
    signIn,
    signUp
}