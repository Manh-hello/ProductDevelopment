import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ok } from "../utils/response";
import { parseOrThrow } from "../utils/validate";
import { AppError } from "../utils/AppError";
import { listAttemptsQuerySchema, recognizeQuerySchema } from "../validators/handwriting.validator";
import * as handwritingService from "../services/handwriting.service";
import { ACCEPTED_IMAGE_TYPES, AcceptedImageType, matchesImageSignature } from "../services/handwriting.service";
import { AuthRequest } from "../types/express";

const uid = (req: Request) => (req as AuthRequest).user.id;

export const status = asyncHandler(async (_req: Request, res: Response) => {
  ok(res, await handwritingService.getStatus(), 200);
});

export const recognize = asyncHandler(async (req: Request, res: Response) => {
  const { vocabularyId } = parseOrThrow(recognizeQuerySchema, req.query);

  const mime = (req.headers["content-type"] ?? "").split(";")[0].trim().toLowerCase();
  if (!(ACCEPTED_IMAGE_TYPES as readonly string[]).includes(mime)) {
    throw new AppError("Định dạng không được hỗ trợ. Chỉ nhận ảnh PNG, JPEG hoặc WebP gửi trực tiếp (Content-Type: image/*).", 415);
  }
  // express.raw chỉ gán Buffer khi có body; thiếu body thì req.body là {}.
  if (!Buffer.isBuffer(req.body) || req.body.length === 0) throw new AppError("Ảnh gửi lên đang trống.", 400);
  if (!matchesImageSignature(req.body, mime)) throw new AppError("Tệp ảnh bị hỏng hoặc không khớp với định dạng khai báo.", 400);

  ok(res, await handwritingService.recognize(uid(req), { image: req.body, mimeType: mime as AcceptedImageType, vocabularyId }), 200);
});

export const attempts = asyncHandler(async (req: Request, res: Response) => {
  const { limit } = parseOrThrow(listAttemptsQuerySchema, req.query);
  ok(res, await handwritingService.listAttempts(uid(req), limit), 200);
});
