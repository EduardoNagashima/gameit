import bcrypt from "bcrypt";
import prisma from "../src/config/database.js";

// create category user
async function main() {
    const hashedPassword = bcrypt.hashSync("admin", 10);

    await prisma.category.create({ data: { name: 'default' } });
    await prisma.user.create({ data: { username: 'admin', email: 'admin@gmail.com', password: hashedPassword, image: 'https://www.nicepng.com/png/full/263-2635963_admin-png.png' } })
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})