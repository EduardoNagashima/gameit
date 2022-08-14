import { Like, Post } from "@prisma/client";
import prisma from "../config/database.js";
import postRepository from "./postRepository.js";

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

async function newlike(like: likeData, post: Post) {

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