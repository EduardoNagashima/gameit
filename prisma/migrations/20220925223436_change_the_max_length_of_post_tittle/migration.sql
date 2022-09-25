/*
  Warnings:

  - You are about to alter the column `tittle` on the `posts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.

*/
-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "tittle" SET DATA TYPE VARCHAR(60);
