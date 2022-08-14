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
    const userPost = await findPostAndUser(like.userId, like.postId);
    await likeRepository.newlike(like, userPost.post);
}

async function deletePost(id: number, userId: number) {
    const userPost = await findPostAndUser(id, userId);
    if (userPost.post.userId !== userId) throw { type: 'UNAUTHORIZED', message: 'User cannot delete this post' };
    await postRepository.deletePost(id);
}

async function get() {
    return await postRepository.getPostsByDate();
}

async function findPostAndUser(postId: number, userId: number) {
    const post = await postRepository.findById(postId);
    if (!post) throw { type: 'NOT_FOUND', message: 'Post not found' };
    const user = await userRepository.findById(userId);
    if (!user) throw { type: 'NOT_FOUND', message: 'User not found' };
    return { post, user };
}

const postService = {
    create,
    get,
    like,
    deletePost
}

export default postService;