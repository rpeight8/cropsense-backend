import { createUser } from "../models/users.model";
import { createBusinessUser } from "../models/businessUsers.model";
import prisma from "../modules/db";
import { createWorkspace } from "../models/workspaces.model";
import { createSeason } from "../models/seasons.model";

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
