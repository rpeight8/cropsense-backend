import { Router } from "express";
import { createUser, deleteUser } from "../handlers/user";

const router = Router();

router.post("/user", createUser);

export default router;
