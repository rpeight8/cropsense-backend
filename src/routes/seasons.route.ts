import { Router } from "express";
import { validateCreateFieldForSeason, validateGetSeasonFields } from "../middlewares/requestsValidators/seasons";
import { createFieldForSeason, getSeasonFields } from "../controllers/seasons.controller";
import { protect } from "../middlewares/protect";

const router = Router();

router.post(
  "/seasons/:id/fields",
  protect,
  validateCreateFieldForSeason,
  createFieldForSeason
);

router.get(
  "/seasons/:id/fields",
  protect,
  validateGetSeasonFields,
  getSeasonFields
);

export default router;
