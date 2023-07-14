import { Router } from "express";
import { protect } from "../middlewares/protect.middleware";
import {
  createWorkspace,
  createWorkspaceSeason,
  deleteWorkspace,
  getWorkspaceSeasons,
  getWorkspaces,
  updateWorkspace,
} from "../controllers/workspaces.controller";
import {
  validateCreateWorkspace,
  validateCreateWorkspaceSeason,
  validateDeleteWorkspace,
  validateGetWorkspaceSeasons,
  validateUpdateWorkspace,
} from "../middlewares/requestsValidators/workspace";

import { validateWorkspaceAccess } from "../middlewares/entityAccess.middleware";

const router = Router();

router.get("/workspaces", protect, getWorkspaces);

router.get(
  "/workspaces/:id/seasons",
  protect,
  validateGetWorkspaceSeasons,
  validateWorkspaceAccess,
  getWorkspaceSeasons
);

router.post(
  "/workspaces/:id/seasons",
  protect,
  validateCreateWorkspaceSeason,
  validateWorkspaceAccess,
  createWorkspaceSeason
);
router.post("/workspaces", protect, validateCreateWorkspace, createWorkspace);

router.put(
  "/workspaces/:id",
  protect,
  validateUpdateWorkspace,
  validateWorkspaceAccess,
  updateWorkspace
);

router.delete(
  "/workspaces/:id",
  protect,
  validateDeleteWorkspace,
  validateWorkspaceAccess,
  deleteWorkspace
);

export default router;
