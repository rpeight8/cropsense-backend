/*
  Warnings:

  - You are about to drop the column `bussinesFieldId` on the `crop_rotations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[businessFieldId,startDate,endDate]` on the table `crop_rotations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `businessFieldId` to the `crop_rotations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "crop_rotations" DROP CONSTRAINT "crop_rotations_bussinesFieldId_fkey";

-- AlterTable
ALTER TABLE "crop_rotations" DROP COLUMN "bussinesFieldId",
ADD COLUMN     "businessFieldId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "crop_rotations_businessFieldId_startDate_endDate_key" ON "crop_rotations"("businessFieldId", "startDate", "endDate");

-- AddForeignKey
ALTER TABLE "crop_rotations" ADD CONSTRAINT "crop_rotations_businessFieldId_fkey" FOREIGN KEY ("businessFieldId") REFERENCES "business_fields"("id") ON DELETE CASCADE ON UPDATE CASCADE;
