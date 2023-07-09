import { z } from "zod";
import { CreateSeasonSchema } from "./seasons";

export const CreateWorkspaceSchema = z.object({
  name: z.string(),
});

export const CreateSeasonForWorkspaceParametersSchema = z.object({
  id: z.string(),
});
export const GetWorkspacesSeasonsParametersSchema = z.object({
  id: z.string(),
});

export const CreateSeasonForWorkspaceBodySchema = CreateSeasonSchema;
