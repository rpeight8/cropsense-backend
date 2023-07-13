import { Router } from "express";
import { protect } from "../middlewares/protect";
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

const router = Router();

router.get("/workspaces", protect, getWorkspaces);
// router.get("/workspaces-with-seasons", protect, getWorkspacesWithSeasons);
// router.get(
//   "/workspaces-with-seasons-with-fields",
//   protect,
//   getWorkspacesWithSeasonsWithFields
// );

router.get(
  "/workspaces/:id/seasons",
  protect,
  validateGetWorkspaceSeasons,
  getWorkspaceSeasons
);

router.post(
  "/workspaces/:id/seasons",
  protect,
  validateCreateWorkspaceSeason,
  createWorkspaceSeason
);
router.post("/workspaces", protect, validateCreateWorkspace, createWorkspace);

router.put(
  "/workspaces/:id",
  protect,
  validateUpdateWorkspace,
  updateWorkspace
);

router.delete(
  "/workspaces/:id",
  protect,
  validateDeleteWorkspace,
  deleteWorkspace
);

export default router;
