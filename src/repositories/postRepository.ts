import prisma from "../config/database.js";
import { postData } from "../services/postService.js";

async function create(post: postData) {
    await prisma.post.create({ data: post });
}

async function getPostsByDate() {
    const posts = await prisma.post.findMany({
        orderBy: {
            createAt: 'asc',
        },
    })
    return posts;
}

async function getPostsByLikes() {
    const posts = await prisma.post.findMany({
        orderBy: {
            likes: 'desc'
        }
    })
}

const postRepository = {
    create,
    getPostsByDate,
    getPostsByLikes
}

export default postRepository;
