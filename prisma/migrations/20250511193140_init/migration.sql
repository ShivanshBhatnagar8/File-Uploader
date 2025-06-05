/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Files` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Folders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `folderId` to the `Files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Folders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Folders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Files" ADD COLUMN     "folderId" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "size" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "upload_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Folders" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "link_expiration" TIMESTAMP(3),
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "sharedLink" TEXT,
ADD COLUMN     "size" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Files_name_key" ON "Files"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Folders_name_key" ON "Folders"("name");

-- AddForeignKey
ALTER TABLE "Files" ADD CONSTRAINT "Files_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
