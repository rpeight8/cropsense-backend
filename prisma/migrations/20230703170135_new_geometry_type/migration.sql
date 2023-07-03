/*
  Warnings:

  - The values [POLYGON,MULTIPOLYGON] on the enum `GEOMETRY_TYPE` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "GEOMETRY_TYPE_new" AS ENUM ('Polygon', 'MultyPolygon');
ALTER TABLE "Field" ALTER COLUMN "geometryType" DROP DEFAULT;
ALTER TABLE "Field" ALTER COLUMN "geometryType" TYPE "GEOMETRY_TYPE_new" USING ("geometryType"::text::"GEOMETRY_TYPE_new");
ALTER TYPE "GEOMETRY_TYPE" RENAME TO "GEOMETRY_TYPE_old";
ALTER TYPE "GEOMETRY_TYPE_new" RENAME TO "GEOMETRY_TYPE";
DROP TYPE "GEOMETRY_TYPE_old";
ALTER TABLE "Field" ALTER COLUMN "geometryType" SET DEFAULT 'Polygon';
COMMIT;

-- AlterTable
ALTER TABLE "Field" ALTER COLUMN "geometryType" SET DEFAULT 'Polygon';
