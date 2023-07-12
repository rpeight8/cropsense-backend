import { Router } from "express";
import { protect } from "../middlewares/protect";
import {
  validateDeleteBusinessField,
  validateGetBusinessFieldSummary,
  validateUpdateBusinessField,
} from "../middlewares/requestsValidators/businessFields";

const router = Router();

router.put(
  "/businessFields/:id",
  protect,
  validateUpdateBusinessField,
  updateBusinessField
);
router.delete(
  "/fields/:id",
  protect,
  validateDeleteBusinessField,
  deleteBusinessField
);
router.get(
  "/fields/:id/summary",
  protect,
  validateGetBusinessFieldSummary,
  getBusinessFieldSummary
);
// router.get(
//   "/fields/:id/weather-current",
//   protect,
//   validateGetFieldWeather,
//   getFieldWeather
// );

export default router;
