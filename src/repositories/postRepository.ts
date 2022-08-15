import { Post } from "@prisma/client";
import prisma from "../config/database.js";
import { postData } from "../services/postService.js";

async function create(post: postData) {
    await prisma.post.create({ data: post });
}

async function getPostsByDate() {
    const posts = await prisma.post.findMany({
        include: { user: { select: { image: true, username: true } } },
        orderBy: {
            createAt: 'desc',
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
    return posts;
}

async function findById(id: number) {
    return await prisma.post.findUnique({ where: { id } })
}

async function addLike(post: Post) {
    await prisma.post.update({
        where: {
            id: post.id
        }, data: {
            likes: (post.likes + 1)
        }
    })
}

async function deslike(post: Post) {
    await prisma.post.update({
        where: {
            id: post.id
        }, data: {
            likes: (post.likes - 1)
        }
    })
}

async function deletePost(id: number) {
    await prisma.post.delete({ where: { id } });
}

async function addView(id: number) {
    const post = await prisma.post.findUnique({ where: { id } });
    await prisma.post.update({
        where: {
            id
        },
        data: {

            views: post.views + 1,
        },
    })
}

const postRepository = {
    addView,
    create,
    getPostsByDate,
    getPostsByLikes,
    findById,
    addLike,
    deslike,
    deletePost
}

export default postRepository;
