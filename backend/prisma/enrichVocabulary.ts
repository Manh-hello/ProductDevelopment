/**
 * Dùng AI làm giàu kho từ vựng: Hán Việt, phồn thể, lượng từ, cách dùng, kết hợp từ, đồng/trái nghĩa
 * và câu ví dụ (đảm bảo mỗi từ có ≥ 3 câu). Cần AI_PROVIDER / AI_API_KEY / AI_MODEL trong backend/.env.
 *
 *   npm run prisma:enrich                          # 40 từ chưa làm giàu (chạy lại để làm tiếp)
 *   npm run prisma:enrich -- --limit=600           # làm hết (tốn nhiều lượt gọi; gói free có giới hạn/ngày)
 *   npm run prisma:enrich -- --level="HSK 1"       # chỉ một cấp độ
 *   npm run prisma:enrich -- --batch=6 --delay=8000
 *   npm run prisma:enrich -- --force               # làm lại cả từ đã làm giàu (ghi đè các trường AI)
 *   npm run prisma:enrich -- --dry-run             # chỉ in kết quả, không ghi DB
 *
 * An toàn: chạy lại nhiều lần (bỏ qua từ đã có `enriched_at`), không xoá dữ liệu, không ghi đè nghĩa/pinyin;
 * chỉ điền trường còn trống (trừ khi --force); câu ví dụ chỉ THÊM, không sửa/xoá câu cũ.
 */
const arg = (name: string, fallback?: string): string | undefined => {
  const hit = process.argv.find((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (!hit) return fallback;
  return hit.includes("=") ? hit.slice(hit.indexOf("=") + 1) : "true";
};

const LIMIT = Math.max(1, Number(arg("limit", "40")));
const BATCH = Math.min(12, Math.max(1, Number(arg("batch", "8"))));
const DELAY_MS = Math.max(0, Number(arg("delay", "6000"))); // 6s/lô ≈ 10 lượt/phút, dưới giới hạn 15 RPM của gói free
const FORCE = arg("force") === "true";
const DRY = arg("dry-run") === "true";
const LEVEL = arg("level");
const TARGET_EXAMPLES = 3;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main(): Promise<void> {
  // Lô nhiều từ cần thời gian hơn mặc định → đặt trước khi nạp cấu hình.
  process.env.AI_TIMEOUT_MS = arg("timeout", "90000");

  const { PrismaClient } = await import("@prisma/client");
  const { generateValidatedJson, isAiConfigured, AI_NOT_CONFIGURED_MESSAGE, aiIdentity } = await import("../src/services/ai");
  const { levelVariants, parseHskLevel } = await import("../src/constants/catalog");
  const E = await import("../src/services/learning/vocabEnrichment");

  if (!isAiConfigured()) {
    console.error(`❌ ${AI_NOT_CONFIGURED_MESSAGE}`);
    process.exit(1);
  }

  const prisma = new PrismaClient();
  const lvl = LEVEL ? parseHskLevel(LEVEL) : null;
  if (LEVEL && !lvl) {
    console.error(`❌ --level phải là HSK 1 … HSK 6 (nhận "${LEVEL}")`);
    process.exit(1);
  }

  const where = {
    ...(FORCE ? {} : { enrichedAt: null }),
    ...(lvl ? { level: { in: levelVariants(lvl) } } : {}),
  };
  const [pending, words] = await Promise.all([
    prisma.vocabulary.count({ where }),
    prisma.vocabulary.findMany({
      where,
      orderBy: [{ createdAt: "asc" }, { hanzi: "asc" }],
      take: LIMIT,
      include: { examples: { select: { sentenceHanzi: true } } },
    }),
  ]);
  const identity = aiIdentity();
  console.log(`🤖 ${identity ?? "AI"} — ${words.length}/${pending} từ chưa làm giàu${lvl ? ` (HSK ${lvl})` : ""}, lô ${BATCH} từ, nghỉ ${DELAY_MS}ms/lô${DRY ? " [dry-run]" : ""}`);

  let done = 0;
  let skipped = 0;
  let newExamples = 0;
  const batches = E.chunk(words, BATCH);

  for (const [bi, batch] of batches.entries()) {
    const request = {
      system: E.enrichmentSystemPrompt(),
      user: E.enrichmentUserPrompt(batch.map((w) => ({ hanzi: w.hanzi, pinyin: w.pinyin, meaning: w.meaning, partOfSpeech: w.partOfSpeech, level: w.level }))),
    };
    let result: import("../src/services/learning/vocabEnrichment").EnrichmentBatch | null = null;
    let stop = false;
    for (let attempt = 1; attempt <= 2 && !result && !stop; attempt++) {
      try {
        result = await generateValidatedJson(E.enrichmentBatchSchema, request);
      } catch (err) {
        const e = err as { statusCode?: number; code?: string; message: string };
        console.warn(`  ⚠️ Lô ${bi + 1}/${batches.length} lỗi: ${e.message}`);
        if (e.code === "NOT_CONFIGURED" || /từ chối/.test(e.message)) {
          console.warn("  ⏹ Dừng: key/cấu hình AI không hợp lệ.");
          stop = true;
        } else if (e.statusCode === 503 && attempt === 1) {
          console.warn("  ⏳ Có vẻ chạm giới hạn lượt/phút — chờ 65s rồi thử lại lô này...");
          await sleep(65_000);
        } else if (e.statusCode === 503) {
          console.warn("  ⏹ Dừng: hết hạn mức (có thể là giới hạn lượt/ngày). Chạy lại lệnh này sau để làm tiếp.");
          stop = true;
        }
      }
    }
    if (stop) break;
    if (!result) {
      skipped += batch.length;
      await sleep(DELAY_MS);
      continue;
    }

    const byHanzi = new Map(result.items.filter((i): i is NonNullable<typeof i> => Boolean(i)).map((i) => [i.hanzi, i]));
    for (const w of batch) {
      const item = byHanzi.get(w.hanzi);
      if (!item) {
        skipped++;
        console.warn(`  – ${w.hanzi}: AI không trả kết quả, sẽ thử lại lần chạy sau`);
        continue;
      }
      const need = Math.max(0, TARGET_EXAMPLES - w.examples.length);
      const c = E.cleanEnrichment(w.hanzi, item, w.examples.map((e) => e.sentenceHanzi), FORCE ? TARGET_EXAMPLES : need);

      if (DRY) {
        console.log(`  ${w.hanzi}`, JSON.stringify({ ...c, examples: c.examples.map((e) => e.sentenceHanzi) }));
      } else {
        const keep = <T>(current: T | null | undefined, next: T | null) => (FORCE || current === null || current === undefined ? next : current);
        await prisma.$transaction([
          prisma.vocabulary.update({
            where: { id: w.id },
            data: {
              hanViet: keep(w.hanViet, c.hanViet),
              traditional: keep(w.traditional, c.traditional),
              measureWord: keep(w.measureWord, c.measureWord),
              usage: keep(w.usage, c.usage),
              synonyms: FORCE || !w.synonyms ? (c.synonyms.length ? c.synonyms : undefined) : undefined,
              antonyms: FORCE || !w.antonyms ? (c.antonyms.length ? c.antonyms : undefined) : undefined,
              collocations: FORCE || !w.collocations ? (c.collocations.length ? c.collocations : undefined) : undefined,
              enrichedAt: new Date(),
              enrichedBy: identity ?? "ai",
            },
          }),
          ...(c.examples.length
            ? [prisma.vocabularyExample.createMany({ data: c.examples.map((e) => ({ vocabularyId: w.id, ...e, source: "ai" })) })]
            : []),
        ]);
      }
      done++;
      newExamples += c.examples.length;
    }
    console.log(`  ✓ Lô ${bi + 1}/${batches.length} — đã xử lý ${done} từ, +${newExamples} câu ví dụ`);
    if (bi < batches.length - 1) await sleep(DELAY_MS);
  }

  const left = DRY || FORCE ? "?" : await prisma.vocabulary.count({ where: { enrichedAt: null, ...(lvl ? { level: { in: levelVariants(lvl) } } : {}) } });
  console.log(`✅ Xong: ${done} từ được làm giàu, ${skipped} bỏ qua, +${newExamples} câu ví dụ. Còn ${left} từ chưa làm giàu.`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
