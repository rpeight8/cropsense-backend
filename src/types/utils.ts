import { z } from "zod";
import { PublicUserSchema } from "../schemas/utils";

export type PublicUser = z.infer<typeof PublicUserSchema>;
