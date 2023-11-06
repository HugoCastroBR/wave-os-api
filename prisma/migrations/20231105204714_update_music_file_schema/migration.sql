/*
  Warnings:

  - You are about to drop the column `name` on the `MusicFile` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `MusicFile` table. All the data in the column will be lost.
  - Added the required column `coverUrl` to the `MusicFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `musicUrl` to the `MusicFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `MusicFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MusicFile" DROP COLUMN "name",
DROP COLUMN "url",
ADD COLUMN     "coverUrl" TEXT NOT NULL,
ADD COLUMN     "musicUrl" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
