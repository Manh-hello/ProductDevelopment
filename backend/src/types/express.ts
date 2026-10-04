import { Request } from "express";

/**
 * Request đã qua middleware authenticateToken - luôn có req.user.
 * Controller dùng type này thay vì Request thường để có type-safety,
 * không cần optional-chaining/non-null assertion lặp lại.
 */
export interface AuthRequest extends Request {
  user: {
    id: string;
  };
}
