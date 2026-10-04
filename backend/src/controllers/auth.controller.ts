import { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ok } from "../utils/response";
import { parseOrThrow } from "../utils/validate";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import * as authService from "../services/auth.service";
import { AuthRequest } from "../types/express";
import { Request } from "express";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const input = parseOrThrow(registerSchema, req.body);
  const result = await authService.registerUser(input);
  ok(res, result, 201);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const input = parseOrThrow(loginSchema, req.body);
  const result = await authService.loginUser(input);
  ok(res, result, 200);
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  const user = await authService.getCurrentUser((req as AuthRequest).user.id);
  ok(res, user, 200);
});
