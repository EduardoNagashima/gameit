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

}

async function findById(id: number) {
    return await prisma.post.findUnique({ where: { id }, include: { user: { select: { image: true, username: true } } } })
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

async function getByViews() {
    return await prisma.post.findMany({ take: 5, orderBy: { views: 'desc' }, include: { user: { select: { image: true, username: true } } } })
}

const postRepository = {
    addView,
    create,
    getPostsByDate,
    getPostsByLikes,
    findById,
    getByViews,
    deletePost
}

export default postRepository;
