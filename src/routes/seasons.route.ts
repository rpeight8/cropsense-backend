import { Router } from "express";
import {
  validateCreateFieldForSeason,
  validateDeleteSeason,
  validateGetSeasonFields,
  validateUpdateSeason,
} from "../middlewares/requestsValidators/seasons";
import {
  createFieldForSeason,
  deleteSeason,
  getSeasonFields,
  updateSeason,
} from "../controllers/seasons.controller";
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

router.put("/seasons/:id", protect, validateUpdateSeason, updateSeason);
router.delete("/seasons/:id", protect, validateDeleteSeason, deleteSeason);

export default router;
