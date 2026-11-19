import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ok } from "../utils/response";
import { parseOrThrow } from "../utils/validate";
import {
  changePasswordSchema,
  deleteAccountSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  updateProfileSchema,
} from "../validators/auth.validator";
import * as authService from "../services/auth.service";
import * as passwordResetService from "../services/passwordReset.service";
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

/** Phản hồi giống hệt nhau dù email có tồn tại hay không (không cho dò tài khoản). */
export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email } = parseOrThrow(forgotPasswordSchema, req.body);
  await passwordResetService.requestPasswordReset(email);
  ok(res, { requested: true }, 200);
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { token, newPassword } = parseOrThrow(resetPasswordSchema, req.body);
  await passwordResetService.resetPassword(token, newPassword);
  ok(res, { reset: true }, 200);
});
