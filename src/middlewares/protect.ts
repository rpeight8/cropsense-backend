import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../modules/auth";
import { PublicUser } from "../types";
import { PublicUserSchema } from "../schemas/auth";

export interface ProtectedRequest extends Request {
  user: PublicUser;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies?.token;

  // token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY1MmVkNGM2LThjYjgtNGY2My04ZTgxLTJmMzMwNDUwOTYxNiIsImVtYWlsIjoidGVzdDJAZ21haWwuY29tIiwibmFtZSI6InRlc3QyIiwiaWF0IjoxNjg4NDU3NTQ2LCJleHAiOjE2ODg1NDM5NDZ9.5uqhSjD3bGNy9OLp2jZjdsw2njtY4MQh96pK2VpUykg";
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
