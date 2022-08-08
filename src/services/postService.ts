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
    const user = await userRepository.findById(like.userId);
    if (!user) throw { type: 'NOT_FOUND', message: 'User not found' };
    const post = await postRepository.findById(like.postId);
    if (!post) throw { type: 'NOT_FOUND', message: 'Post not found' };
    const userAlreadyLike = await likeRepository.findByUser(like);
    if (userAlreadyLike[0]?.value === like.value) throw { type: 'CONFLICT', message: 'User already like this post' };


    if (like.value === true) {
        await likeRepository.newlike(like, userAlreadyLike[0]?.id);
        await postRepository.addLike(post);
    };

    if (like.value === false) {
        await likeRepository.newlike(like, userAlreadyLike[0]?.id);
        await postRepository.deslike(post);
    };
}

const postService = {
    create,
    like
}

export default postService;