import { Post } from "@prisma/client";
import postRepository from "../repositories/postRepository.js";

export type postData = Omit<Post, "id" | "likes" | "createAt">;

async function create(post: postData) {
    await postRepository.create(post);
}


const postService = {
    create
}

export default postService;