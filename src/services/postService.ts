import { Post } from "@prisma/client";
import likeRepository from "../repositories/likeRepository.js";
import postRepository from "../repositories/postRepository.js";
import { userRepository } from "../repositories/userRepository.js";

export type postData = Omit<Post, "id" | "likes" | "createAt">;

type likeData = {
    userId: number,
    value: boolean,
    postId: number
}
async function create(post: postData) {
    await postRepository.create(post);
}

async function like(like: likeData) {
    // QUANDO CLICAR NO LIKE DAR LIKE NA POSTAGEM
    // QUANDO CLICAR NO LIKE NOVAMENTE ELE TIRA ESSE LIKE
    // SE CLICAR NO DESLIKE ELE DA DESLIKE NA POSTAGEM
    // SE CLICAR NO DESLIKE NOVAMENTE ELE TIRA O DESLIKE
    // CASO JÁ TENHA UM DESLIKE/LIKE ELE COLOCA O INVERSO 

    const user = await userRepository.findById(like.userId);
    if (!user) throw { type: 'NOT_FOUND', message: 'User not found' };
    const post = await postRepository.findById(like.postId);
    if (!post) throw { type: 'NOT_FOUND', message: 'Post not found' };
    await likeRepository.newlike(like, post);
}

const postService = {
    create,
    like
}

export default postService;