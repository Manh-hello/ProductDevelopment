import { PrismaClient } from "@prisma/client";

/**
 * Singleton PrismaClient.
 *
 * Không tạo `new PrismaClient()` ở nhiều nơi khác nhau trong code,
 * vì mỗi instance sẽ mở một connection pool riêng tới PostgreSQL,
 * dễ dẫn đến hết connection khi app lớn dần.
 */
export const prisma = new PrismaClient();
