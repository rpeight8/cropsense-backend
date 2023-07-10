import { PublicUserSchema } from "./schemas/auth";
import { z } from "zod";

export type PublicUser = z.TypeOf<typeof PublicUserSchema>;

declare global {
  namespace Express {
    interface Request {
      user: PublicUser;
    }
  }
}
