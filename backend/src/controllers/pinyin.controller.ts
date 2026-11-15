import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ok } from "../utils/response";
import { parseOrThrow } from "../utils/validate";
import { convertToPinyin } from "../utils/pinyin";
import { convertPinyinSchema } from "../validators/pinyin.validator";

export const convertPinyin = asyncHandler(async (req: Request, res: Response) => {
  const { text, style } = parseOrThrow(convertPinyinSchema, req.body);
  ok(res, { input: text, ...convertToPinyin(text, style) }, 200);
});
