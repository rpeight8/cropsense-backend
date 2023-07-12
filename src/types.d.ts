import { z } from "zod";
import { PublicUserSchema } from "./schemas/utils";

export type PublicUser = z.TypeOf<typeof PublicUserSchema>;

declare global {
  namespace Express {
    interface Request {
      user: PublicUser;
    }
  }
}
