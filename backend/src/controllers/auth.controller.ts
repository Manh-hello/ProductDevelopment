import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ok } from "../utils/response";
import { parseOrThrow } from "../utils/validate";
import {
  changePasswordSchema,
  deleteAccountSchema,
  loginSchema,
  registerSchema,
  updateProfileSchema,
} from "../validators/auth.validator";
import * as authService from "../services/auth.service";
import { AuthRequest } from "../types/express";

const uid = (req: Request) => (req as AuthRequest).user.id;

export const register = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await authService.registerUser(parseOrThrow(registerSchema, req.body)), 201);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await authService.loginUser(parseOrThrow(loginSchema, req.body)), 200);
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await authService.getCurrentUser(uid(req)), 200);
});

export const updateMe = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await authService.updateProfile(uid(req), parseOrThrow(updateProfileSchema, req.body)), 200);
});

export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  await authService.changePassword(uid(req), parseOrThrow(changePasswordSchema, req.body));
  ok(res, { changed: true }, 200);
});

export const deleteMe = asyncHandler(async (req: Request, res: Response) => {
  await authService.deleteAccount(uid(req), parseOrThrow(deleteAccountSchema, req.body).password);
  ok(res, { deleted: true }, 200);
});

export const exportMe = asyncHandler(async (req: Request, res: Response) => {
  ok(res, await authService.exportUserData(uid(req)), 200);
});
