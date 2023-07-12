import { Router } from "express";
import { deleteField, updateField } from "../controllers/fields.controller";
import { protect } from "../middlewares/protect";
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
