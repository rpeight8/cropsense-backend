import { Router } from "express";
import {
  validateCreateField,
  validateGetField,
} from "../middlewares/validators/fields";
import { createField, getField, getFields } from "../handlers/fields";
import { protect } from "../middlewares/protect";

const router = Router();

router.get("/fields", protect, getFields);

router.get("/fields/:id", protect, validateGetField, getField);

router.post("/fields", protect, validateCreateField, createField);

router.put("/fields/:id", (req, res) => {});

router.delete("/fields/:id", (req, res) => {});

export default router;
