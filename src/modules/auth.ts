import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { Request, Response, NextFunction } from "express";

import { UserFromToken } from "../types";

export const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const generateToken = (payload: UserFromToken) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not found");
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not found");
  }
  return jwt.verify(token, process.env.JWT_SECRET) as UserFromToken;
};
