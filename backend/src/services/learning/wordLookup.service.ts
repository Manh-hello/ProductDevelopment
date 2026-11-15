import { pinyin as pinyinPro } from "pinyin-pro";
import { AI_NOT_CONFIGURED_MESSAGE, AiError, aiIdentity, generateValidatedJson, isAiConfigured } from "../ai";
import { AppError } from "../../utils/AppError";
import { convertToPinyin } from "../../utils/pinyin";
import { stripPinyinTones } from "../../utils/text";
import { TtlCache } from "../../utils/ttlCache";
import { AiLookupInput } from "../../validators/ai.validator";
import { lookupVocabulary } from "../vocabulary.service";
import { classifyInput } from "./classifyInput";
import { composeNotes } from "./composeNotes";
import { sentenceKey } from "./sentenceRules";
import {
  AiExample,
  AiWord,
  aiExamplesOnlySchema,
  aiWordSchema,
  examplesSystemPrompt,
  examplesUserPrompt,
  wordSystemPrompt,
  wordUserPrompt,
} from "./wordLookup.prompts";

export type DataSource = "database" | "pinyin-library" | "ai";

export interface SuggestedExample {
  sentenceHanzi: string;
  sentencePinyin: string;
  sentenceMeaning: string;
  explanation: string | null;
  source: "database" | "ai";
}

export interface WordSuggestion {
  hanzi: string;
  pinyin: string;
  meaning: string;
  partOfSpeech: string | null;
  level: string | null;
  /** Nội dung gợi ý cho ô "Ghi chú chung": cách dùng, kết hợp từ, từ dễ nhầm. */
  notes: string | null;
  examples: SuggestedExample[];
  /** Cách đọc khác (từ nhiều âm / AI đề xuất khác thư viện) để người học tự chọn. */
  alternativeReadings: { pinyin: string; meaning: string | null; source: DataSource }[];
  /** Nghĩa do AI đề xuất khác với nghĩa đã có trong kho (không tự ghi đè). */
  aiMeaning: string | null;
  sources: { pinyin: DataSource; meaning: DataSource; level: DataSource | null; examples: "database" | "ai" | "mixed" | "none" };
}

export type AiStatus = "ok" | "skipped" | "unavailable" | "error";

export interface WordLookupResult {
  input: string;
  inputType: "word" | "phrase";
  existing: Awaited<ReturnType<typeof lookupVocabulary>>;
  suggestion: WordSuggestion;
  ai: { status: AiStatus; message: string | null; cached: boolean };
  /** Có dữ liệu do AI tạo → UI phải cảnh báo "cần kiểm tra lại". */
  aiGenerated: boolean;
  warnings: string[];
}

/** Gợi ý của AI theo Hán tự là dữ liệu dùng chung (không gắn user) nên cache được. */
const wordCache = new TtlCache<AiWord>(24 * 60 * 60 * 1000, 500);

export async function lookupWordWithAi(userId: string, input: AiLookupInput): Promise<WordLookupResult> {
  const { normalized, kind } = classifyInput(input.text);

  if (kind === "not_chinese") throw new AppError("Vui lòng nhập từ hoặc cụm từ tiếng Trung (Hán tự).", 400);
  if (kind === "sentence") {
    throw new AppError(
      "Đây là một câu hoặc đoạn dài, không phải từ/cụm từ (tối đa 10 chữ Hán, không có dấu câu). Hãy nhập từ cần học; để luyện câu, dùng tính năng Tạo câu ở mục Luyện Câu.",
      400
    );
  }

  const existing = await lookupVocabulary(normalized, userId);
  const exact = existing.items.find((i) => i.hanzi === normalized) ?? null;
  const style = kind === "word" ? "word" : "sentence";
  const libPinyin = convertToPinyin(normalized, style).pinyin;

  const warnings: string[] = [];
  const dbExamples: SuggestedExample[] = (exact?.examples ?? []).map((e) => ({
    sentenceHanzi: e.sentenceHanzi,
    sentencePinyin: e.sentencePinyin,
    sentenceMeaning: e.sentenceMeaning,
    explanation: null,
    source: "database" as const,
  }));

  // --- Quyết định có cần gọi AI không: kho đã đủ (nghĩa + >=2 ví dụ) thì KHÔNG tốn AI, trừ khi người dùng ép tạo lại ---
  const dbIsComplete = Boolean(exact && exact.meaning && exact.examples.length >= 2);
  const needAi = input.focus === "examples" || input.force === true || !dbIsComplete;

  let aiStatus: AiStatus = "skipped";
  let aiMessage: string | null = null;
  let cached = false;
  let aiWord: AiWord | null = null;
  let aiExamples: AiExample[] = [];

  if (needAi) {
    if (!isAiConfigured()) {
      aiStatus = "unavailable";
      aiMessage = AI_NOT_CONFIGURED_MESSAGE;
    } else {
      try {
        if (input.focus === "examples") {
          const avoid = (input.avoidSentences ?? []).slice(0, 10);
          const res = await generateValidatedJson(aiExamplesOnlySchema, {
            system: examplesSystemPrompt(),
            user: examplesUserPrompt(normalized, avoid),
          });
          aiExamples = res.examples.filter((e): e is AiExample => e !== null);
        } else {
          const key = `${aiIdentity()}|${normalized}`;
          const hit = input.force ? undefined : wordCache.get(key);
          if (hit) {
            aiWord = hit;
            cached = true;
          } else {
            aiWord = await generateValidatedJson(aiWordSchema, {
              system: wordSystemPrompt(),
              user: wordUserPrompt(normalized, exact?.meaning),
            });
            wordCache.set(key, aiWord);
          }
          aiExamples = aiWord.examples.filter((e): e is AiExample => e !== null);
        }
        aiStatus = "ok";
      } catch (err) {
        if (!(err instanceof AiError)) throw err;
        aiStatus = err.code === "NOT_CONFIGURED" ? "unavailable" : "error";
        aiMessage = err.message;
      }
    }
  }

  // --- Chuẩn hoá ví dụ do AI: phải chứa đúng từ cần tra, không trùng, Pinyin tính bằng thư viện (không tin Pinyin AI) ---
  const seen = new Set<string>([...dbExamples.map((e) => sentenceKey(e.sentenceHanzi)), ...(input.avoidSentences ?? []).map(sentenceKey)]);
  const aiExamplesClean: SuggestedExample[] = [];
  let droppedExamples = 0;
  for (const ex of aiExamples) {
    const key = sentenceKey(ex.sentence);
    if (!ex.sentence.includes(normalized) || seen.has(key)) {
      droppedExamples++;
      continue;
    }
    seen.add(key);
    aiExamplesClean.push({
      sentenceHanzi: ex.sentence,
      sentencePinyin: convertToPinyin(ex.sentence, "sentence").pinyin,
      sentenceMeaning: ex.meaning,
      explanation: ex.explanation ?? null,
      source: "ai",
    });
  }
  if (droppedExamples > 0) warnings.push(`Đã loại ${droppedExamples} câu ví dụ do AI tạo vì không chứa đúng từ "${normalized}" hoặc bị trùng.`);
  if (aiStatus === "ok" && aiExamplesClean.length === 0 && dbExamples.length === 0) {
    warnings.push('AI chưa tạo được câu ví dụ hợp lệ. Bạn có thể bấm "Tạo lại ví dụ".');
  }

  // --- Pinyin: thư viện là nguồn chính (xử lý theo ngữ cảnh); AI chỉ dùng để đối chiếu ---
  const primaryPinyin = exact?.pinyin ?? libPinyin;
  const alternativeReadings: WordSuggestion["alternativeReadings"] = [];
  const addReading = (p: string, meaning: string | null, source: DataSource) => {
    const norm = (s: string) => s.normalize("NFC").replace(/\s+/g, "").toLowerCase();
    if (!p.trim() || norm(p) === norm(primaryPinyin) || alternativeReadings.some((r) => norm(r.pinyin) === norm(p))) return;
    alternativeReadings.push({ pinyin: p.trim(), meaning, source });
  };

  if (Array.from(normalized).length === 1) {
    const all = pinyinPro(normalized, { toneType: "symbol", type: "array", multiple: true }) as string[];
    all.forEach((p) => addReading(p, null, "pinyin-library"));
  }
  if (aiWord) {
    aiWord.readings.forEach((r) => addReading(r.pinyin, r.meaning || null, "ai"));
    if (aiWord.pinyin && stripPinyinTones(aiWord.pinyin) === stripPinyinTones(primaryPinyin) && aiWord.pinyin.replace(/\s+/g, "") !== primaryPinyin.replace(/\s+/g, "")) {
      warnings.push(`Dấu thanh AI đề xuất (${aiWord.pinyin}) khác thư viện (${primaryPinyin}). Đã dùng kết quả của thư viện — hãy kiểm tra lại.`);
      addReading(aiWord.pinyin, null, "ai");
    } else if (aiWord.pinyin && stripPinyinTones(aiWord.pinyin) !== stripPinyinTones(primaryPinyin)) {
      addReading(aiWord.pinyin, null, "ai");
    }
  }
  if (alternativeReadings.length > 0 && !exact) warnings.push("Từ này có thể có nhiều cách đọc — chọn cách đọc phù hợp ở dưới ô Pinyin.");

  // --- Gộp: dữ liệu có sẵn trong kho KHÔNG bị ghi đè bằng AI ---
  const meaning = exact?.meaning ?? aiWord?.meaning ?? "";
  const aiMeaning = exact && aiWord && aiWord.meaning && aiWord.meaning !== exact.meaning ? aiWord.meaning : null;
  const partOfSpeech = exact?.partOfSpeech ?? aiWord?.partOfSpeech ?? null;
  const aiLevel = aiWord?.hskLevel ? `HSK ${aiWord.hskLevel}` : null;
  const level = exact?.level ?? aiLevel;
  const notes = exact?.notes?.trim() ? exact.notes : aiWord ? composeNotes(aiWord) : null;

  const examples = [...dbExamples, ...aiExamplesClean];
  const hasAiData = Boolean(aiWord) || aiExamplesClean.length > 0;

  return {
    input: normalized,
    inputType: kind,
    existing,
    suggestion: {
      hanzi: normalized,
      pinyin: primaryPinyin,
      meaning,
      partOfSpeech,
      level,
      notes,
      examples,
      alternativeReadings,
      aiMeaning,
      sources: {
        pinyin: exact ? "database" : "pinyin-library",
        meaning: exact ? "database" : "ai",
        level: exact?.level ? "database" : aiLevel ? "ai" : null,
        examples: dbExamples.length && aiExamplesClean.length ? "mixed" : dbExamples.length ? "database" : aiExamplesClean.length ? "ai" : "none",
      },
    },
    ai: { status: aiStatus, message: aiMessage, cached },
    aiGenerated: hasAiData,
    warnings,
  };
}
