-- DropForeignKey
ALTER TABLE "Crop" DROP CONSTRAINT "Crop_createdById_fkey";

-- AlterTable
ALTER TABLE "Crop" ALTER COLUMN "createdById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Crop" ADD CONSTRAINT "Crop_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
