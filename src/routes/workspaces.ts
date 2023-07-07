import { Router } from "express";
import { protect } from "../middlewares/protect";
import {
  createSeasonForWorkspace,
  getWorkspaces,
  getWorkspacesWithSeasons,
  getWorkspacesWithSeasonsWithFields,
} from "../controllers/workspaces";
import { create } from "domain";
import { createWorkspace } from "../controllers/workspaces";
import { validateCreateSeasonForWorkspace, validateCreateWorkspace } from "../middlewares/requestsValidators/workspace";

const router = Router();

router.get("/workspaces", protect, getWorkspaces);
router.get("/workspaces-with-seasons", protect, getWorkspacesWithSeasons);
router.get(
  "/workspaces-with-seasons-with-fields",
  protect,
  getWorkspacesWithSeasonsWithFields
);

router.post("/workspaces/:id/seasons", protect, validateCreateSeasonForWorkspace, createSeasonForWorkspace);
router.post("/workspaces", protect, validateCreateWorkspace, createWorkspace);

export default router;
