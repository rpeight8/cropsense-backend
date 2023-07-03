-- DropForeignKey
ALTER TABLE "Crop" DROP CONSTRAINT "Crop_updatedById_fkey";

-- AlterTable
ALTER TABLE "Crop" ALTER COLUMN "updatedById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Crop" ADD CONSTRAINT "Crop_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
