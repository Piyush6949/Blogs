/*
  Warnings:

  - You are about to drop the column `content` on the `Blog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "content",
ADD COLUMN     "content_html" TEXT,
ADD COLUMN     "content_json" JSONB;
