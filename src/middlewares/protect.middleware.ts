import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../modules/auth";
import { PublicUser } from "../types";
import { PublicUserSchema } from "../schemas/utils";

export interface ProtectedRequest extends Request {
  user: PublicUser;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = verifyToken(token);
    const publicUser = PublicUserSchema.parse(decoded);
    req.user = publicUser;
    next();
  } catch (err) {
    res.status(401);
    next(err);
  }
};
