import { Router } from "express";
import { signIn, signOut, signUp, verify } from "../controllers/auth.controller";
import {
  validateSignIn,
  validateSignUp,
} from "../middlewares/requestsValidators/auth";

const router = Router();
router.post("/auth/verify", verify);
router.post("/auth/signin", validateSignIn, signIn);
router.post("/auth/signup", validateSignUp, signUp);
router.post("/auth/signout", signOut);

export default router;
