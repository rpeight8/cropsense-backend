import { z } from "zod";
import { CreateFieldSchema } from "./fields";

export const CreateSeasonSchema = z.object({
  name: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  workspaceId: z.string(),
});

export const GetSeasonParametersSchema = z.object({
  seasonId: z.string(),
});

export const CreateFieldForSeasonParametersSchema = z.object({
  id: z.string(),
});
export const CreateFieldForSeasonSchema = CreateFieldSchema;

export const GetSeasonFieldsParametersSchema = z.object({
  id: z.string(),
});
