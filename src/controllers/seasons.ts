import { TypeOf } from "zod";
import { ProtectedRequest } from "../middlewares/protect";
import { NextFunction, Response } from "express";
import prisma from "../modules/db";
import { Season } from "@prisma/client";
import {
  createSeasonSchema,
  getSeasonParametersSchema,
  updateSeasonParametersSchema,
  updateSeasonSchema,
} from "../middlewares/validators/seasons";

interface GetSeasonsRequest extends ProtectedRequest {}
interface GetSeasonRequest extends ProtectedRequest {
  params: TypeOf<typeof getSeasonParametersSchema>;
}

interface CreateSeasonRequest extends ProtectedRequest {
  body: TypeOf<typeof createSeasonSchema>;
}

interface UpdateSeasonRequest extends ProtectedRequest {
  params: TypeOf<typeof updateSeasonParametersSchema>;
  body: TypeOf<typeof updateSeasonSchema>;
}

interface DeleteSeasonRequest extends ProtectedRequest {
  params: TypeOf<typeof getSeasonParametersSchema>;
}

export const getSeasons = async (
  req: GetSeasonsRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    const seasons = await prisma.season.findMany({
      where: {
        createdById: user.id,
      },
      orderBy: {
        startDate: "asc",
      },
    });

    res.status(200).json(seasons);
  } catch (err) {
    next(err);
  }
};

export const getSeason = async (
  req: GetSeasonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { seasonId } = req.params;

    const user = req.user;

    const season = await prisma.season.findFirst({
      where: {
        id: seasonId,
      },
    });

    if (!season) {
      return res.status(404).json({ message: "Season not found" });
    }

    if (season.createdById !== user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.status(200).json(season);
  } catch (err) {
    next(err);
  }
};

export const createSeason = async (
  req: CreateSeasonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    const { name, startDate, endDate } = req.body;

    const season = await prisma.season.create({
      data: {
        name,
        startDate,
        endDate,
        createdById: user.id,
      },
    });

    res.status(201).json(season);
  } catch (err) {
    next(err);
  }
}

export const updateSeason = async (
  req: UpdateSeasonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { seasonId } = req.params;

    const user = req.user;

    const { name, startDate, endDate } = req.body;

    const season = await prisma.season.findFirst({
      where: {
        id: seasonId,
      },
    });

    if (!season) {
      return res.status(404).json({ message: "Season not found" });
    }

    if (season.createdById !== user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const updatedSeason = await prisma.season.update({
      where: {
        id: seasonId,
      },
      data: {
        name,
        startDate,
        endDate,
      },
    });

    res.status(200).json(updatedSeason);
  } catch (err) {
    next(err);
  }
}

export const deleteSeason = async (
  req: DeleteSeasonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { seasonId } = req.params;

    const user = req.user;

    const season = await prisma.season.findFirst({
      where: {
        id: seasonId,
      },
    });

    if (!season) {
      return res.status(404).json({ message: "Season not found" });
    }

    if (season.createdById !== user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await prisma.season.delete({
      where: {
        id: seasonId,
      },
    });

    res.status(204).json();
  } catch (err) {
    next(err);
  }
}
