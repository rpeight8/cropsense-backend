import { createUser } from "../models/user";
import { createBusinessUser } from "../models/businessUser";
import prisma from "../modules/db";
import { createWorkspace } from "../models/workspace";
import { createSeason } from "../models/season";

export const registerNewUser = async (email: string, password: string) => {
  return await prisma.$transaction(async () => {
    const newUser = await createUser(email, password);
    const newBussinesUser = await createBusinessUser(newUser.id, email, "");
    const newWorkspace = await createWorkspace(
      newBussinesUser.id,
      "My first workspace"
    );
    const newSeason = createSeason(
      newWorkspace.id,
      newBussinesUser.id,
      "My first season"
    );

    return { newUser, newBussinesUser };
  });
};
