import { Router } from "express";
import { protect } from "../middlewares/protect";
import {
  validateDeleteBusinessField,
  validateUpdateBusinessField,
} from "../middlewares/requestsValidators/businessFields";
import {
  deleteBusinessField,
  updateBusinessField,
} from "../controllers/businessFields.controller";

const router = Router();

router.put(
  "/fields/:id",
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
// router.get(
//   "/fields/:id/summary",
//   protect,
//   validateGetBusinessFieldSummary,
//   getBusinessFieldSummary
// );
// router.get(
//   "/fields/:id/weather-current",
//   protect,
//   validateGetFieldWeather,
//   getFieldWeather
// );

export default router;
