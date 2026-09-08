import { Response } from "express";

/**
 * Chuẩn hoá format response trên toàn bộ API, theo đúng quy ước:
 *
 * Success: { success: true, data: ... }
 * Error:   { success: false, message: "..." }
 */
export function ok<T>(res: Response, data: T, statusCode = 200): Response {
  return res.status(statusCode).json({ success: true, data });
}

export function fail(
  res: Response,
  message: string,
  statusCode = 400,
  errors?: unknown
): Response {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors ? { errors } : {}),
  });
}
