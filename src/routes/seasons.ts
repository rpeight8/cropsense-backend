import { Router } from "express";
import {
  validateGetSeasons,
  validateCreateSeason,
  validateGetSeason,
  validateUpdateSeason,
  validateDeleteSeason,
} from "../middlewares/validators/seasons";
import {
  getSeasons,
  getSeason,
  createSeason,
  updateSeason,
  deleteSeason,
} from "../controllers/seasons";
import { protect } from "../middlewares/protect";

const router = Router();

router.get("/seasons", protect, validateGetSeasons, getSeasons);
router.get("/seasons/:seasonId", protect, validateGetSeasons, getSeason);
router.post("/seasons", protect, validateCreateSeason, createSeason);
router.put("/seasons/:seasonId", protect, validateUpdateSeason, updateSeason);
router.delete(
  "/seasons/:seasonId",
  protect,
  validateDeleteSeason,
  deleteSeason
);

export default router;
