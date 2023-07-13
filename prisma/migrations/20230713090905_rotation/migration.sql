/*
  Warnings:

  - You are about to alter the column `name` on the `BusinessField` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `email` on the `BusinessUser` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `name` on the `BusinessUser` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `name` on the `Crop` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `color` on the `Crop` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `name` on the `Field` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `name` on the `Season` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `name` on the `Workspace` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(50)`.
  - A unique constraint covering the columns `[fieldId,seasonId]` on the table `BusinessField` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fieldId` to the `BusinessField` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BusinessUser" DROP CONSTRAINT "BusinessUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "CropRotation" DROP CONSTRAINT "CropRotation_bussinesFieldId_fkey";

-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_ownerId_fkey";

-- AlterTable
ALTER TABLE "BusinessField" ADD COLUMN     "fieldId" TEXT NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "BusinessUser" ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "Crop" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "color" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "Field" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "Season" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Workspace" ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessField_fieldId_seasonId_key" ON "BusinessField"("fieldId", "seasonId");

-- AddForeignKey
ALTER TABLE "BusinessUser" ADD CONSTRAINT "BusinessUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "BusinessUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessField" ADD CONSTRAINT "BusinessField_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropRotation" ADD CONSTRAINT "CropRotation_bussinesFieldId_fkey" FOREIGN KEY ("bussinesFieldId") REFERENCES "BusinessField"("id") ON DELETE CASCADE ON UPDATE CASCADE;
