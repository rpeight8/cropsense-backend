import { Router } from "express";
import { protect } from "../middlewares/protect.middleware";
// import {
//   validateDeleteField,
//   validateGetFieldSummary,
//   validateUpdateField,
// } from "../middlewares/requestsValidators/fields";

const router = Router();

// router.put("/fields/:id", protect, validateUpdateField, updateField);
// router.delete("/fields/:id", protect, validateDeleteField, deleteField);
// router.get(
//   "/fields/:id/summary",
//   protect,
//   validateGetFieldSummary,
//   getFieldSummary
// );
// router.get(
//   "/fields/:id/weather-current",
//   protect,
//   validateGetFieldWeather,
//   getFieldWeather
// );

export default router;
