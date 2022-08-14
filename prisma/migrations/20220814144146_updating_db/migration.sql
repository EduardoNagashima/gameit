/*
  Warnings:

  - You are about to drop the column `value` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the `answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reports` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reports_answers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "answer" DROP CONSTRAINT "answer_postId_fkey";

-- DropForeignKey
ALTER TABLE "reports" DROP CONSTRAINT "reports_postId_fkey";

-- DropForeignKey
ALTER TABLE "reports_answers" DROP CONSTRAINT "reports_answers_answerId_fkey";

-- AlterTable
ALTER TABLE "likes" DROP COLUMN "value";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "image" SET DEFAULT 'https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTExXzMuanBn.jpg';

-- DropTable
DROP TABLE "answer";

-- DropTable
DROP TABLE "reports";

-- DropTable
DROP TABLE "reports_answers";
