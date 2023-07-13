import { Router } from "express";
import { protect } from "../middlewares/protect";
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

const router = Router();

router.post(
  "/seasons/:id/fields",
  protect,
  validateCreateSeasonBusinessField,
  createSeasonBusinessField
);

router.get(
  "/seasons/:id/fields",
  protect,
  validateGetSeasonBusinessFields,
  getSeasonBusinessFields
);

router.put("/seasons/:id", protect, validateUpdateSeason, updateSeason);
router.delete("/seasons/:id", protect, validateDeleteSeason, deleteSeason);

export default router;
