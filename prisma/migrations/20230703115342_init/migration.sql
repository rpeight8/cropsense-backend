-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_updatedById_fkey";

-- AlterTable
ALTER TABLE "Field" ALTER COLUMN "updatedById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
