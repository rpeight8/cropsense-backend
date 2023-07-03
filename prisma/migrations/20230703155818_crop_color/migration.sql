/*
  Warnings:

  - Added the required column `color` to the `Crop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Crop" ADD COLUMN     "color" VARCHAR(255) NOT NULL;
