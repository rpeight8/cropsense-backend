import { Router } from "express";
import { createUser, deleteUser } from "../controllers/user";

const router = Router();

router.post("/user", createUser);

export default router;
