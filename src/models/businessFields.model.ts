import prisma from "../modules/db";
import { BusinessField, Prisma } from "@prisma/client";

export const getBusinessFieldById = async (id: string) => {
  const businessField = await prisma.businessField.findUnique({
    where: {
      id,
    },
  });
  return businessField;
};

export const getBusinessFieldsBySeasonId = async (id: string) => {
  const businessFieldsWithCropBySeasonId = await prisma.season.findUnique({
    where: { id },
    include: {
      businessFields: {
        include: {
          cropRotations: {
            include: {
              crop: true,
            },
          },
        },
      },
    },
  });

  const businessFields = businessFieldsWithCropBySeasonId?.businessFields ?? [];

  return businessFields;
};

export const createBusinessField = async <
  T extends Prisma.BusinessFieldCreateArgs
>(
  args: Prisma.SelectSubset<T, Prisma.BusinessFieldCreateArgs>
) => {
  const newBusinessField = await prisma.businessField.create(args);

  return newBusinessField;
};

export const updateBusinessField = async <
  T extends Prisma.BusinessFieldUpdateArgs
>(
  args: Prisma.SelectSubset<T, Prisma.BusinessFieldUpdateArgs>
) => {
  const updatedBusinessField = await prisma.businessField.update<T>(args);
  return updatedBusinessField;
};

export const deleteBusinessField = async <
  T extends Prisma.BusinessFieldDeleteArgs
>(
  args: Prisma.SelectSubset<T, Prisma.BusinessFieldDeleteArgs>
) => {
  const deletedBusinessField = await prisma.businessField.delete(args);
  return deletedBusinessField;
};

export const getBusinessFieldSiblings = async (id: string) => {
  const bussinesField = await prisma.businessField.findUnique({
    where: {
      id,
    },
  });

  if (!bussinesField) {
    return [];
  }

  const businessFieldSiblings = await prisma.businessField.findMany({
    where: {
      fieldId: bussinesField.fieldId,
      id: {
        not: id,
      },
    },
  });

  return businessFieldSiblings;
};
