/*
  Warnings:

  - You are about to drop the column `coordinates` on the `Field` table. All the data in the column will be lost.
  - You are about to drop the column `cropId` on the `Field` table. All the data in the column will be lost.
  - You are about to drop the column `geometryType` on the `Field` table. All the data in the column will be lost.
  - You are about to drop the column `seasonId` on the `Field` table. All the data in the column will be lost.
  - You are about to drop the column `fieldId` on the `NDVI` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_cropId_fkey";

-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "NDVI" DROP CONSTRAINT "NDVI_fieldId_fkey";

-- AlterTable
ALTER TABLE "Field" DROP COLUMN "coordinates",
DROP COLUMN "cropId",
DROP COLUMN "geometryType",
DROP COLUMN "seasonId";

-- AlterTable
ALTER TABLE "NDVI" DROP COLUMN "fieldId";

-- CreateTable
CREATE TABLE "BusinessField" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "geometry" JSONB[],
    "geometryType" "GEOMETRY_TYPE" NOT NULL DEFAULT 'Polygon',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT,
    "seasonId" TEXT NOT NULL,

    CONSTRAINT "BusinessField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CropRotation" (
    "id" TEXT NOT NULL,
    "bussinesFieldId" TEXT NOT NULL,
    "cropId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT,

    CONSTRAINT "CropRotation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BusinessField" ADD CONSTRAINT "BusinessField_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "BusinessUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessField" ADD CONSTRAINT "BusinessField_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "BusinessUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessField" ADD CONSTRAINT "BusinessField_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropRotation" ADD CONSTRAINT "CropRotation_bussinesFieldId_fkey" FOREIGN KEY ("bussinesFieldId") REFERENCES "BusinessField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropRotation" ADD CONSTRAINT "CropRotation_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "Crop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropRotation" ADD CONSTRAINT "CropRotation_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "BusinessUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CropRotation" ADD CONSTRAINT "CropRotation_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "BusinessUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
