// Không cấu hình AI: ứng dụng vẫn nạp được cấu hình và tính năng AI báo lỗi rõ ràng.
process.env.DATABASE_URL = "mysql://u:p@localhost:3306/x";
process.env.JWT_SECRET = "test";
process.env.AI_PROVIDER = "";
process.env.AI_API_KEY = "";
process.env.AI_MODEL = "";
process.env.AI_BASE_URL = "";

import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { z } from "zod";

describe("AI chưa cấu hình", () => {
  it("env để trống không làm app dừng; isAiConfigured = false; gọi AI → NOT_CONFIGURED 503 kèm hướng dẫn", async () => {
    const { isAiConfigured, getAiProvider, generateValidatedJson, AiError } = await import("../src/services/ai");
    assert.equal(isAiConfigured(), false);
    assert.equal(getAiProvider(), null);
    await assert.rejects(generateValidatedJson(z.object({}), { system: "s", user: "u" }), (e) => {
      assert.ok(e instanceof AiError && e.code === "NOT_CONFIGURED" && e.statusCode === 503);
      assert.match(e.message, /AI_API_KEY/);
      return true;
    });
  });
});
