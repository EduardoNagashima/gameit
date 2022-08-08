import { Like } from "@prisma/client";
import prisma from "../config/database.js";

type LikeData = Omit<Like, "id">

async function findByUser(like: LikeData) {
    return await prisma.like.findMany({
        where: {
            AND: [
                { postId: like.postId },
                { userId: like.userId }
            ]
        }
    })
}

async function newlike(like: LikeData, id?: number) {
    if (id) {
        await prisma.like.updateMany({
            where: {
                AND: [{
                    userId: like.userId,
                }, {
                    postId: like.postId
                }],
            },
            data: {
                value: like.value,
            },
        })
    } else {
        await prisma.like.create({
            data: like
        })
    }
}

const likeRepository = {
    findByUser,
    newlike,
}

export default likeRepository;