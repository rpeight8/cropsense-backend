import type { User } from "@prisma/client";

export type UserFromToken = Pick<User, "id" | "email" | "name">;

declare global {
  namespace Express {
    interface Request {
      user: UserFromToken;
    }
  }
}
