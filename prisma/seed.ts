import bcrypt from "bcrypt";
import prisma from "../src/config/database.js";

// create category user
async function main() {
    const hashedPassword = bcrypt.hashSync("admin", 10);

    await prisma.category.upsert({ where: { id: 1 }, update: {}, create: { name: 'deafault' } });
    await prisma.user.upsert({ where: { email: 'admin@gmail.com' }, update: {}, create: { username: 'admin', email: 'admin@gmail.com', password: hashedPassword, image: 'https://www.nicepng.com/png/full/263-2635963_admin-png.png' } });
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})