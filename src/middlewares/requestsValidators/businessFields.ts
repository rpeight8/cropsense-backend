import { NextFunction, Request, Response } from "express";
import { RequestParametersWithIdSchema } from "../../schemas/utils";
import {
  DeleteBusinessFieldRequestSchema,
  UpdateBusinessFieldRequestSchema,
} from "../../schemas/requests";

export const validateUpdateBusinessField = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UpdateBusinessFieldRequestSchema.parseAsync(req);
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const validateDeleteBusinessField = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await DeleteBusinessFieldRequestSchema.parseAsync(req);
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};

// export const validateGetBusinessFieldSummary = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     await validateGetBusinessFieldSummaryRequestSchema.parseAsync(req);
//     next();
//   } catch (error) {
//     res.status(400);
//     next(error);
//   }
// };
