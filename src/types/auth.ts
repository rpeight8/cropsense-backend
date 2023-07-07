import { Request, Response } from "express";
import { signInSchema, signUpSchema } from "../schemas/auth";
import { TypeOf } from "zod";
import { PublicUser } from "../types";

export interface signUpRequest extends Request {
  body: TypeOf<typeof signUpSchema>;
}
export interface signInRequest extends Request {
  body: TypeOf<typeof signInSchema>;
}

export interface signInResponse
  extends Response<PublicUser | { message: string }> {}
