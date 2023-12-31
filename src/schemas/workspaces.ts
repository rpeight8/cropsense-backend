import { z } from "zod";
import { CreateSeasonBodySchema } from "./seasons";

export const CreateWorkspaceBodySchema = z.object({
  name: z.string(),
});

export const UpdateWorkspaceBodySchema = z.object({
  name: z.string(),
});
export const UpdateWorkspaceParametersSchema = z.object({
  id: z.string(),
});

export const DeleteWorkspaceParametersSchema = z.object({
  id: z.string(),
});

export const CreateSeasonForWorkspaceParametersSchema = z.object({
  id: z.string(),
});
export const GetWorkspacesSeasonsParametersSchema = z.object({
  id: z.string(),
});

export const CreateSeasonForWorkspaceBodySchema = CreateSeasonBodySchema;
