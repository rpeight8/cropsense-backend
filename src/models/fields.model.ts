import prisma from "../modules/db";
import { Prisma } from "@prisma/client";

export const createField = async (field: Prisma.FieldCreateInput) => {
  const newField = await prisma.field.create({
    data: {
      ...field,
    },
  });

  return newField;
};

export const deleteField = async (id: string) => {
  const deletedField = await prisma.field.delete({
    where: {
      id,
    },
  });

  return deletedField;
};

export const getFieldById = async (id: string) => {
  const field = await prisma.field.findUnique({
    where: {
      id,
    },
  });

  return field;
};
