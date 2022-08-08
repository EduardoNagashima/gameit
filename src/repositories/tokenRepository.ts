import { Session } from "@prisma/client";
import prisma from "../config/database.js";

type sessionData = Omit<Session, "id" | "createAt">

async function create(session: sessionData) {
    await prisma.session.create({ data: session });
}

async function findByToken(token: string) {
    return await prisma.session.findFirst({ where: { token } });
}

const tokenRepository = {
    create,
    findByToken
}

export default tokenRepository;