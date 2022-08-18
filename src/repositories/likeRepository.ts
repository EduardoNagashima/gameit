import { Like } from "@prisma/client";
import prisma from "../config/database.js";

type likeData = Omit<Like, "id">

async function findByUser(like: likeData) {
    return await prisma.like.findFirst({
        where: {
            AND: [
                { postId: like.postId },
                { userId: like.userId }
            ]
        }
    })
}

async function newlike(like: likeData) {
    await prisma.like.createMany({ data: { postId: like.postId, userId: like.userId } })
}

async function deleteLike(id: number) {
    await prisma.like.delete({ where: { id } })
}

const likeRepository = {
    findByUser,
    newlike,
    deleteLike
}

export default likeRepository;