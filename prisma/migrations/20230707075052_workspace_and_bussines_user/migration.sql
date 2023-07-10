/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Made the column `createdById` on table `Crop` required. This step will fail if there are existing NULL values in that column.
  - Made the column `seasonId` on table `Field` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `workspaceId` to the `Season` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdById` on table `Season` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Crop" DROP CONSTRAINT "Crop_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Crop" DROP CONSTRAINT "Crop_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_createdById_fkey";

-- AlterTable
ALTER TABLE "Crop" ALTER COLUMN "createdById" SET NOT NULL;

-- AlterTable
ALTER TABLE "Field" ALTER COLUMN "seasonId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Season" ADD COLUMN     "workspaceId" TEXT NOT NULL,
ALTER COLUMN "createdById" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name";

-- CreateTable
CREATE TABLE "BusinessUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "BusinessUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workspace" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BusinessUser_email_key" ON "BusinessUser"("email");

-- AddForeignKey
ALTER TABLE "BusinessUser" ADD CONSTRAINT "BusinessUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "BusinessUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "BusinessUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "BusinessUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "BusinessUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "BusinessUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "BusinessUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crop" ADD CONSTRAINT "Crop_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "BusinessUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crop" ADD CONSTRAINT "Crop_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "BusinessUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
