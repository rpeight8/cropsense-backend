/*
  Warnings:

  - You are about to alter the column `email` on the `BusinessUser` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "BusinessUser" ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Crop" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Field" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Season" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Workspace" ALTER COLUMN "updatedAt" DROP NOT NULL;
