/*
  Warnings:

  - You are about to drop the `BusinessField` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BusinessUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Crop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CropRotation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Field` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NDVI` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Season` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Workspace` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "geometry_types" AS ENUM ('Polygon', 'MultyPolygon');

-- DropForeignKey
ALTER TABLE "BusinessField" DROP CONSTRAINT "BusinessField_createdById_fkey";

-- DropForeignKey
ALTER TABLE "BusinessField" DROP CONSTRAINT "BusinessField_fieldId_fkey";

-- DropForeignKey
ALTER TABLE "BusinessField" DROP CONSTRAINT "BusinessField_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "BusinessField" DROP CONSTRAINT "BusinessField_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "BusinessUser" DROP CONSTRAINT "BusinessUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "Crop" DROP CONSTRAINT "Crop_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Crop" DROP CONSTRAINT "Crop_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "CropRotation" DROP CONSTRAINT "CropRotation_bussinesFieldId_fkey";

-- DropForeignKey
ALTER TABLE "CropRotation" DROP CONSTRAINT "CropRotation_createdById_fkey";

-- DropForeignKey
ALTER TABLE "CropRotation" DROP CONSTRAINT "CropRotation_cropId_fkey";

-- DropForeignKey
ALTER TABLE "CropRotation" DROP CONSTRAINT "CropRotation_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Field" DROP CONSTRAINT "Field_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_updatedById_fkey";

-- DropForeignKey
ALTER TABLE "Season" DROP CONSTRAINT "Season_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_updatedById_fkey";

-- DropTable
DROP TABLE "BusinessField";

-- DropTable
DROP TABLE "BusinessUser";

-- DropTable
DROP TABLE "Crop";

-- DropTable
DROP TABLE "CropRotation";

-- DropTable
DROP TABLE "Field";

-- DropTable
DROP TABLE "NDVI";

-- DropTable
DROP TABLE "Season";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Workspace";

-- DropEnum
DROP TYPE "GEOMETRY_TYPE";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_users" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "business_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspaces" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "ownerId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT,

    CONSTRAINT "workspaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seasons" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT,

    CONSTRAINT "seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fields" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT,

    CONSTRAINT "fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_fields" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "geometry" JSONB[],
    "geometryType" "geometry_types" NOT NULL DEFAULT 'Polygon',
    "fieldId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT,
    "seasonId" TEXT NOT NULL,

    CONSTRAINT "business_fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crop_rotations" (
    "id" TEXT NOT NULL,
    "bussinesFieldId" TEXT NOT NULL,
    "cropId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT,

    CONSTRAINT "crop_rotations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "crops" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "color" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT,

    CONSTRAINT "crops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ndvis" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "picture" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ndvis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "business_users_email_key" ON "business_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "business_fields_fieldId_seasonId_key" ON "business_fields"("fieldId", "seasonId");

-- AddForeignKey
ALTER TABLE "business_users" ADD CONSTRAINT "business_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "business_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "business_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "business_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "business_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seasons" ADD CONSTRAINT "seasons_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "business_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fields" ADD CONSTRAINT "fields_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "business_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fields" ADD CONSTRAINT "fields_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "business_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_fields" ADD CONSTRAINT "business_fields_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "fields"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_fields" ADD CONSTRAINT "business_fields_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "business_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_fields" ADD CONSTRAINT "business_fields_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "business_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_fields" ADD CONSTRAINT "business_fields_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "seasons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crop_rotations" ADD CONSTRAINT "crop_rotations_bussinesFieldId_fkey" FOREIGN KEY ("bussinesFieldId") REFERENCES "business_fields"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crop_rotations" ADD CONSTRAINT "crop_rotations_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "crops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crop_rotations" ADD CONSTRAINT "crop_rotations_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "business_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crop_rotations" ADD CONSTRAINT "crop_rotations_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "business_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crops" ADD CONSTRAINT "crops_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "business_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "crops" ADD CONSTRAINT "crops_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "business_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
