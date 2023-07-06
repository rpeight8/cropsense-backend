-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_cropId_fkey";

-- AlterTable
ALTER TABLE "Season" ALTER COLUMN "cropId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "Crop"("id") ON DELETE SET NULL ON UPDATE CASCADE;
