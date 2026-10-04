import { NextFunction, Request, Response } from "express";

type AsyncRouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

/**
 * Bọc controller async để tự động forward lỗi (Promise rejection) sang
 * errorHandler, vì Express 4 KHÔNG tự bắt lỗi từ async function.
 * Tránh phải viết try/catch lặp lại ở mỗi controller.
 */
export function asyncHandler(handler: AsyncRouteHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next).catch(next);
  };
}
