import { Prisma } from "@prisma/client";
import prisma from "../modules/db";

type cropRotationForUpdate = Omit<Prisma.CropRotationUpdateInput, "createdBy">;

export const updateCropRotation = async (
  id: string,
  cropRotationWithArgs:
    | {
        data: cropRotationForUpdate;
      }
    | {
        data: cropRotationForUpdate;
        include: Prisma.CropRotationInclude;
      }
    | {
        data: cropRotationForUpdate;
        select: Prisma.CropRotationSelect;
      }
) => {
  const updatedCropRotation = await prisma.cropRotation.update({
    where: {
      id,
    },
    ...cropRotationWithArgs,
  });

  return updatedCropRotation;
};

type cropRotationsForCreate = Prisma.CropRotationCreateManyInput;

export const createCropRotations = async (
  cropRotationsWithArgs:
    | {
        data: cropRotationsForCreate;
      }
    | {
        data: cropRotationsForCreate;
        include: Prisma.CropRotationInclude;
      }
    | {
        data: cropRotationsForCreate;
        select: Prisma.CropRotationSelect;
      }
) => {
  const craetedCropRotations = await prisma.cropRotation.createMany(
    cropRotationsWithArgs
  );

  return craetedCropRotations;
};

type cropRotationForCreate = Prisma.CropRotationCreateInput;

export const createCropRotation = async (
  cropRotationWithArgs:
    | {
        data: cropRotationForCreate;
      }
    | {
        data: cropRotationForCreate;
        include: Prisma.CropRotationInclude;
      }
    | {
        data: cropRotationForCreate;
        select: Prisma.CropRotationSelect;
      }
) => {
  const craetedCropRotation = await prisma.cropRotation.create(
    cropRotationWithArgs
  );

  return craetedCropRotation;
};

export const deleteCropRotations = async (
  cropRotationsWithArgs:
    | {
        where: Prisma.CropRotationWhereInput;
      }
    | {
        where: Prisma.CropRotationWhereInput;
        include?: Prisma.CropRotationInclude;
      }
    | {
        where: Prisma.CropRotationWhereInput;
        select?: Prisma.CropRotationSelect;
      }
) => {
  const deletedCropRotations = await prisma.cropRotation.deleteMany(
    cropRotationsWithArgs
  );

  return deletedCropRotations;
};

export const getCropRotations = async (
  cropRotationsWithArgs:
    | {
        where: Prisma.CropRotationWhereInput;
      }
    | {
        where: Prisma.CropRotationWhereInput;
        include?: Prisma.CropRotationInclude;
      }
    | {
        where: Prisma.CropRotationWhereInput;
        select?: Prisma.CropRotationSelect;
      }
) => {
  const cropRotations = await prisma.cropRotation.findMany(
    cropRotationsWithArgs
  );

  return cropRotations;
};
