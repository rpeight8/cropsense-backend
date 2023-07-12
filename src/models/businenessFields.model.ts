import prisma from "../modules/db";

export const getBusinessFieldById = async (businessFieldId: string) => {
  const businessField = await prisma.businessField.findUnique({
    where: {
      id: businessFieldId,
    },
  });
  return businessField;
};
