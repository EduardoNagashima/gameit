import bcrypt from "bcrypt";
import dotenv from "dotenv"
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { findByEmail, signInRepository } from "../repositories/userRepository.js";
dotenv.config();

export type userData = Omit<User, "id">

export async function signUpService(userInfos: userData) {
    userInfos.password = bcrypt.hashSync(userInfos.password, 10);
    const user = await findByEmail(userInfos.email);
    if (user) throw { type: 'CONFLICT', message: 'Email já cadastrado' }
    await signInRepository(userInfos);
}

export async function signInService(userInfos: userData) {
    const user = await findByEmail(userInfos.email);
    const validPassword = bcrypt.compareSync(userInfos.password, user.password)
    if (!validPassword || !user) throw { type: 'UNAUTHORIZED', message: 'Email ou senha invalidos' };
    try {
        const token = jwt.sign({ email: userInfos.email }, process.env.JWT_SECRET, {
            expiresIn: 84600
        });
        return token;
    } catch (err) {
        console.log(err);
    }
}