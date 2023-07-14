import { Router } from "express";
import { protect } from "../middlewares/protect.middleware";
import {
  validateCreateSeasonBusinessField,
  validateDeleteSeason,
  validateGetSeasonBusinessFields,
  validateUpdateSeason,
} from "../middlewares/requestsValidators/seasons";
import {
  createSeasonBusinessField,
  deleteSeason,
  getSeasonBusinessFields,
  updateSeason,
} from "../controllers/seasons.controller";

import { validateSeasonAccess } from "../middlewares/entityAccess.middleware";

const router = Router();

router.post(
  "/seasons/:id/fields",
  protect,
  validateCreateSeasonBusinessField,
  validateSeasonAccess,
  createSeasonBusinessField
);

router.get(
  "/seasons/:id/fields",
  protect,
  validateGetSeasonBusinessFields,
  validateSeasonAccess,
  getSeasonBusinessFields
);

router.put(
  "/seasons/:id",
  protect,
  validateUpdateSeason,
  validateSeasonAccess,
  updateSeason
);
router.delete(
  "/seasons/:id",
  protect,
  validateDeleteSeason,
  validateSeasonAccess,
  deleteSeason
);

export default router;
