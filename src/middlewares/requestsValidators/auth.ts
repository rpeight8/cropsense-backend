import { NextFunction, Request, Response } from "express";
import {
  SignInRequestSchema,
  SignUpRequestSchema,
} from "../../schemas/requests";

export const validateSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await SignUpRequestSchema.parseAsync(req);
    next();
  } catch (err) {
    res.status(400);
    next(err);
  }
};

export const validateSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await SignInRequestSchema.parseAsync(req);
    next();
  } catch (err) {
    res.status(400);
    next(err);
  }
};
