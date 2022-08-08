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
    const userAlreadyLike = await likeRepository.findByUser(like);
    console.log(userAlreadyLike)
    if (userAlreadyLike) {
        await likeRepository.deleteLike(userAlreadyLike.id)
        if (userAlreadyLike.value) {
            await postRepository.deslike(post);
        } else {
            await postRepository.addLike(post);
        }
    } else {
        await prisma.like.create({
            data: like
        });
        if (like.value === true) {
            await postRepository.addLike(post);
        } else {
            await postRepository.deslike(post);
        }
    }
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