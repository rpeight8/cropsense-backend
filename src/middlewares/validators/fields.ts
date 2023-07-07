import { NextFunction, Request, Response } from "express";
import { CreateFieldSchema } from "../../schemas/fields";

export const validateCreateField = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CreateFieldSchema.parseAsync(req.body);
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};
