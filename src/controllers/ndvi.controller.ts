import { TypeOf } from "zod";
import { ProtectedRequest } from "../middlewares/protect";
import { getNDVIParametersSchema } from "../middlewares/requestsValidators/ndvi";
import { NextFunction, Response } from "express";
import prisma from "../modules/db";
import { NDVI } from "@prisma/client";

interface GetNDVIRequest extends ProtectedRequest {
  params: TypeOf<typeof getNDVIParametersSchema>;
}

// const prepareNDVIForResponse = (ndvi: NDVI) => {
//   console.log(ndvi);
//   return {
//     id: ndvi.id,
//     fieldId: ndvi.fieldId,
//     date: ndvi.date.toISOString().slice(0, 10).replace(/-/g, ""),
//     pictureURL: ndvi.picture,
//   };
// };

// export const getNDVI = async (
//   req: GetNDVIRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { fieldId, date } = req.params;

//     const user = req.user;

//     const field = await prisma.field.findUnique({
//       where: {
//         id: fieldId,
//       },
//     });

//     if (!field) {
//       return res.status(404).json({ message: "Field not found" });
//     }

//     if (field.createdById !== user.id) {
//       return res.status(403).json({ message: "Forbidden" });
//     }

//     const ndvi = await prisma.nDVI.findMany({
//       where: (date && {
//         fieldId: fieldId,
//         date: date,
//       }) || {
//         fieldId: fieldId,
//       },
//       orderBy: {
//         date: "asc",
//       },
//     });

//     const preparedNDVI = ndvi.map(prepareNDVIForResponse);

//     res.status(200).json(preparedNDVI);
//   } catch (err) {
//     res.status(500);
//     next(err);
//   }
// };
