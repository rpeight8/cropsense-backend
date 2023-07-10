-- AlterTable
ALTER TABLE "Season" ADD COLUMN     "updatedById" TEXT;

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "BusinessUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
