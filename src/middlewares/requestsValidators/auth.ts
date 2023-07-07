import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { signInSchema, signUpSchema } from "../../schemas/auth";

export const validateSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await signUpSchema.parseAsync(req.body);
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
    await signInSchema.parseAsync(req.body);
    next();
  } catch (err) {
    res.status(400);
    next(err);
  }
};
