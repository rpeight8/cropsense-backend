import { Router } from "express";
import { protect } from "../middlewares/protect";
import {
  createSeasonForWorkspace,
  deleteWorkspace,
  getWorkspaces,
  getWorkspacesSeasons,
  getWorkspacesWithSeasons,
  getWorkspacesWithSeasonsWithFields,
  updateWorkspace,
} from "../controllers/workspaces.controller";
import { create } from "domain";
import { createWorkspace } from "../controllers/workspaces.controller";
import {
  validateCreateSeasonForWorkspace,
  validateCreateWorkspace,
  validateDeleteWorkspace,
  validateUpdateWorkspace,
  validateWorkspacesSeasons,
} from "../middlewares/requestsValidators/workspace";

const router = Router();

router.get("/workspaces", protect, getWorkspaces);
router.get("/workspaces-with-seasons", protect, getWorkspacesWithSeasons);
router.get(
  "/workspaces-with-seasons-with-fields",
  protect,
  getWorkspacesWithSeasonsWithFields
);
router.get(
  "/workspaces/:id/seasons",
  protect,
  validateWorkspacesSeasons,
  getWorkspacesSeasons
);

router.post(
  "/workspaces/:id/seasons",
  protect,
  validateCreateSeasonForWorkspace,
  createSeasonForWorkspace
);
router.post("/workspaces", protect, validateCreateWorkspace, createWorkspace);

router.put(
  "/workspaces/:id",
  protect,
  validateUpdateWorkspace,
  updateWorkspace
);

router.delete("/workspaces/:id", validateDeleteWorkspace, deleteWorkspace);

export default router;
