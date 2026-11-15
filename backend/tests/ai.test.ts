// Chạy với AI đã cấu hình (khoá giả) và fetch bị thay bằng stub - KHÔNG gọi mạng thật.
process.env.DATABASE_URL = "mysql://u:p@localhost:3306/x";
process.env.JWT_SECRET = "test";
process.env.AI_PROVIDER = "openai";
process.env.AI_API_KEY = "sk-SECRET-KEY-123";
process.env.AI_MODEL = "test-model";
process.env.AI_TIMEOUT_MS = "1000";

import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { z } from "zod";

const schema = z.object({ ok: z.literal(true) });
const realFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = realFetch; });

const chat = (content: string) => new Response(JSON.stringify({ choices: [{ message: { content } }] }), { status: 200 });

describe("generateValidatedJson (stub fetch)", () => {
  it("trả dữ liệu hợp lệ và gửi key qua header, không đưa key lên URL/body", async () => {
    const { generateValidatedJson } = await import("../src/services/ai");
    let seen: { url: string; init: RequestInit } | null = null;
    globalThis.fetch = (async (url: string, init: RequestInit) => { seen = { url, init }; return chat('```json\n{"ok":true}\n```'); }) as typeof fetch;
    assert.deepEqual(await generateValidatedJson(schema, { system: "s", user: "u" }), { ok: true });
    assert.ok(seen);
    const s = seen as unknown as { url: string; init: RequestInit };
    assert.equal((s.init.headers as Record<string, string>).Authorization, "Bearer sk-SECRET-KEY-123");
    assert.ok(!s.url.includes("SECRET") && !String(s.init.body).includes("SECRET"));
  });

  it("JSON/schema sai lần đầu thì thử lại đúng 1 lần rồi thành công", async () => {
    const { generateValidatedJson } = await import("../src/services/ai");
    let calls = 0;
    globalThis.fetch = (async () => (++calls === 1 ? chat("không phải json") : chat('{"ok":true}'))) as typeof fetch;
    assert.deepEqual(await generateValidatedJson(schema, { system: "s", user: "u" }), { ok: true });
    assert.equal(calls, 2);
  });

  it("sai 2 lần → INVALID_OUTPUT (502), không retry vô hạn", async () => {
    const { generateValidatedJson, AiError } = await import("../src/services/ai");
    let calls = 0;
    globalThis.fetch = (async () => { calls++; return chat('{"ok":false}'); }) as typeof fetch;
    await assert.rejects(generateValidatedJson(schema, { system: "s", user: "u" }), (e) => e instanceof AiError && e.code === "INVALID_OUTPUT" && e.statusCode === 502);
    assert.equal(calls, 2);
  });

  it("HTTP 401 → UPSTREAM, thông báo lỗi không lộ key hay nội dung phản hồi", async () => {
    const { generateValidatedJson, AiError } = await import("../src/services/ai");
    globalThis.fetch = (async () => new Response(JSON.stringify({ error: { message: "Incorrect API key sk-SECRET-KEY-123", type: "invalid_request_error" } }), { status: 401 })) as typeof fetch;
    await assert.rejects(generateValidatedJson(schema, { system: "s", user: "u" }), (e) => {
      assert.ok(e instanceof AiError && e.code === "UPSTREAM");
      assert.ok(!e.message.includes("SECRET") && !e.message.includes("Incorrect"));
      return true;
    });
  });

  it("HTTP 429 → 503 kèm hướng dẫn thử lại; lỗi mạng → UPSTREAM", async () => {
    const { generateValidatedJson, AiError } = await import("../src/services/ai");
    globalThis.fetch = (async () => new Response("{}", { status: 429 })) as typeof fetch;
    await assert.rejects(generateValidatedJson(schema, { system: "s", user: "u" }), (e) => e instanceof AiError && e.statusCode === 503);
    globalThis.fetch = (async () => { throw new TypeError("fetch failed https://api.openai.com/v1?key=SECRET"); }) as typeof fetch;
    await assert.rejects(generateValidatedJson(schema, { system: "s", user: "u" }), (e) => e instanceof AiError && e.code === "UPSTREAM" && !e.message.includes("SECRET"));
  });

  it("quá thời gian → TIMEOUT (504)", async () => {
    const { generateValidatedJson, AiError } = await import("../src/services/ai");
    globalThis.fetch = ((_url: string, init: RequestInit) => new Promise((_res, rej) => {
      init.signal?.addEventListener("abort", () => rej(Object.assign(new Error("aborted"), { name: "AbortError" })));
    })) as typeof fetch;
    await assert.rejects(generateValidatedJson(schema, { system: "s", user: "u" }), (e) => e instanceof AiError && e.code === "TIMEOUT" && e.statusCode === 504);
  });
});
