import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const getNDVIParametersSchema = z.object({
  fieldId: z.string(),
  date: z.string().optional(),
});

export const validateGetNDVI = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await getNDVIParametersSchema.parseAsync(req.params);
    next();
    console.log("validateGetNDVI: success");
  } catch (err) {
    res.status(400);
    next(err);
    console.log("validateGetNDVI: error");
  }
};
