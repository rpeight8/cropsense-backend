import { Router } from "express";
import { protect } from "../middlewares/protect";
import {
  getWorkspaces,
  getWorkspacesWithSeasons,
  getWorkspacesWithSeasonsWithFields,
} from "../controllers/workspaces";
import { create } from "domain";
import { createWorkspace } from "../controllers/workspaces";
import { validateCreateWorkspace } from "../middlewares/requestsValidators/workspace";

const router = Router();

router.get("/workspaces", protect, getWorkspaces);
router.get("/workspaces-with-seasons", protect, getWorkspacesWithSeasons);
router.get(
  "/workspaces-with-seasons-with-fields",
  protect,
  getWorkspacesWithSeasonsWithFields
);

router.post("/workspaces", protect, validateCreateWorkspace, createWorkspace);

export default router;
