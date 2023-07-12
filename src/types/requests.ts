import { z } from "zod";
import { UpdateBusinessFieldRequestSchema } from "../schemas/requests";

export interface UpdateBusinessFieldRequest
  extends z.infer<typeof UpdateBusinessFieldRequestSchema> {}
