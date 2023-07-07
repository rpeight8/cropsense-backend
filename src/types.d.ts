import type { User, BusinessUser } from "@prisma/client";

export type PublicUser = Pick<User, "id" | "email"> & {
  businessUserId: BusinessUser["id"];
};

declare global {
  namespace Express {
    interface Request {
      user: PublicUser;
    }
  }
}
