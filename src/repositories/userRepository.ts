import prisma from "../config/database.js";
import { userData } from "../services/userService.js";

export async function signInRepository(userInfos: userData) {
    await prisma.user.create({ data: userInfos })
}

export async function findByEmail(email: string) {
    const result = await prisma.user.findUnique({ where: { email } });
    return result;
}