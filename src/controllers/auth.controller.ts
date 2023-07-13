import { NextFunction, Request, Response } from "express";
import prisma from "../modules/db";
import { comparePassword, generateToken, verifyToken } from "../modules/auth";
import { getUserByEmail } from "../models/users.model";
import { registerNewUser } from "../services/signUpService";
import {
  getBusinessUser,
  getBusinessUserById,
} from "../models/businessUsers.model";
import { SignInRequest, SignUpRequest } from "../types/requests";
import {
  SignInResponse,
  SignOutResponse,
  SignUpResponse,
  VerifyResponse,
} from "../types/responses";

export const verify = async (
  req: Request,
  res: VerifyResponse,
  next: NextFunction
) => {
  let token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = verifyToken(token);
    const bussinesUser = await getBusinessUserById(user.businessUserId);
    console.log(bussinesUser);
    if (!bussinesUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
    next(err);
  }
};

export const signIn = async (req: SignInRequest, res: SignInResponse) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: "Missing fields" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const businessUser = await getBusinessUser(user.id, user.email);

  if (!businessUser) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const publicUser = {
    id: user.id,
    email: user.email,
    businessUserId: businessUser.id,
  };

  const token = generateToken(publicUser);

  res.cookie("token", token, {
    // httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "development" ? false : true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json(publicUser);
  res.end();
};

export const signUp = async (req: SignUpRequest, res: SignUpResponse) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const exisitingUser = await getUserByEmail(email);

  if (exisitingUser) {
    return res.status(409).json({ message: "The email is already taken" });
  }

  try {
    await registerNewUser(email, password);
    res.status(201).json({ message: "User created" });
    res.end();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "An error occured while creating user" });
    res.end();
  }
};

export const signOut = async (req: Request, res: SignOutResponse) => {
  res.clearCookie("token");

  res.status(200).json({ message: "Logout successful" });
};
