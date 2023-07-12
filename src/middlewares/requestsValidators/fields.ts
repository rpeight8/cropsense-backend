import { NextFunction, Request, Response } from "express";
import { RequestParametersWithIdSchema } from "../../schemas/utils";

// export const validateCreateField = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     await CreateFieldBodySchema.parseAsync(req.body);
//     next();
//   } catch (error) {
//     console.log("ERROR");
//     res.status(400);
//     next(error);
//   }
// };

// export const validateUpdateField = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     await UpdateFieldBodySchema.parseAsync(req.body);
//     await RequestParametersWithIdSchema.parseAsync(req.params);
//     next();
//   } catch (error) {
//     res.status(400);
//     next(error);
//   }
// };

// export const validateDeleteField = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     await RequestParametersWithIdSchema.parseAsync(req.params);
//     next();
//   } catch (error) {
//     res.status(400);
//     next(error);
//   }
// };

// export const validateGetFieldSummary = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     await RequestParametersWithIdSchema.parseAsync(req.params);
//     next();
//   } catch (error) {
//     res.status(400);
//     next(error);
//   }
// };
