import prisma from "../modules/db";
import { Prisma } from "@prisma/client";

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
            // where: {
            //   startDate: {
            //     lte: new Date(),
            //   },
            //   endDate: {
            //     gte: new Date(),
            //   },
            // },
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

export const createBusinessField = async (
  businessField: Prisma.BusinessFieldCreateInput
) => {
  const newBusinessField = await prisma.businessField.create({
    data: {
      ...businessField,
    },
    include: {
      cropRotations: {
        include: {
          crop: true,
        },
      },
    },
  });

  return newBusinessField;
};

export const updateBusinessField = async (
  id: string,
  businessUserId: string,
  businessField: Prisma.BusinessFieldUpdateInput
) => {
  const updatedBusinessField = await prisma.businessField.update({
    where: {
      id,
    },
    data: {
      ...businessField,
      updatedBy: {
        connect: {
          id: businessUserId,
        },
      },
    },
    include: {
      cropRotations: {
        include: {
          crop: true,
        },
      },
    },
  });
  return updatedBusinessField;
};

export const deleteBusinessField = async (id: string) => {
  const deletedBusinessField = await prisma.businessField.delete({
    where: {
      id,
    },
  });
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
