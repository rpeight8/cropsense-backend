import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../modules/auth";
import { UserFromToken } from "../types";

export interface ProtectedRequest extends Request {
  user: UserFromToken;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
    next(err);
  }
};
