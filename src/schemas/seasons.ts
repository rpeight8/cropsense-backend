import { z } from "zod";
import { CreateFieldSchema } from "./fields";

const isValidUTCDateString = (value: string) => {
  const date = new Date(value);
  return !isNaN(date.getTime()) && value === date.toISOString();
};

export const SeasonForResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  workspaceId: z.string(),
});

export const SeasonStartDateSchema = z.string().refine(isValidUTCDateString, {
  message: "Invalid startDate format. Expected a valid UTC date string.",
  path: ["startDate"],
});

export const SeasonEndDateSchema = z.string().refine(isValidUTCDateString, {
  message: "Invalid endDate format. Expected a valid UTC date string.",
  path: ["endDate"],
});

export const CreateSeasonBodySchema = z.object({
  name: z.string(),
  startDate: SeasonStartDateSchema,
  endDate: SeasonEndDateSchema,
});

export const UpdateSeasonBodySchema = z.object({
  name: z.string(),
  startDate: SeasonStartDateSchema,
  endDate: SeasonEndDateSchema,
});

export const UpdateSeasonParametersSchema = z.object({
  id: z.string(),
});

export const DeleteSeasonParametersSchema = z.object({
  id: z.string(),
});

export const GetSeasonParametersSchema = z.object({
  seasonId: z.string(),
});

export const CreateFieldForSeasonParametersSchema = z.object({
  id: z.string(),
});
export const CreateFieldForSeasonBodySchema = CreateFieldSchema;

export const GetSeasonFieldsParametersSchema = z.object({
  id: z.string(),
});
