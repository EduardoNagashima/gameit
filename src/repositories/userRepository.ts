import prisma from "../config/database.js";
import { userData } from "../services/userService.js";

async function create(user: userData) {
    await prisma.user.create({ data: user });
}

async function findByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
}

async function findById(id: number) {
    return await prisma.user.findUnique({ where: { id } })
}

export const userRepository = {
    create,
    findByEmail,
    findById
}