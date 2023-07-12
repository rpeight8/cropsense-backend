import { Router } from "express";
import { protect } from "../middlewares/protect";
import {
  createWorkspace,
  deleteWorkspace,
  getWorkspaces,
  updateWorkspace,
} from "../controllers/workspaces.controller";
import {
  validateCreateWorkspace,
  validateCreateWorkspaceSeason,
  validateDeleteWorkspace,
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
// router.get(
//   "/workspaces/:id/seasons",
//   protect,
//   validateWorkspacesSeasons,
//   getWorkspacesSeasons
// );

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
