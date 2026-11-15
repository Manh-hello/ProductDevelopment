import { PrismaClient } from "@prisma/client";
import { TOPICS } from "../src/constants/catalog";
import { loadHskWords } from "./hskSeedData";
import { ACHIEVEMENT_DEFS } from "../src/constants/achievementCatalog";
import { EXERCISE_CATALOG } from "../src/constants/exerciseCatalog";

const prisma = new PrismaClient();

const EXERCISES = EXERCISE_CATALOG;

const ACHIEVEMENTS = ACHIEVEMENT_DEFS.map(({ code, name, description, icon, xpReward }) => ({ code, name, description, icon, xpReward }));

interface SeedVocab {
  hanzi: string;
  pinyin: string;
  meaning: string;
  level: string;
  partOfSpeech: string;
  tags: string[];
  example: { hanzi: string; pinyin: string; meaning: string };
}

const VOCABULARIES: SeedVocab[] = [
  { hanzi: "我", pinyin: "wǒ", meaning: "tôi", level: "HSK 1", partOfSpeech: "đại từ", tags: ["đại từ", "cơ bản"], example: { hanzi: "我是学生。", pinyin: "Wǒ shì xuéshēng.", meaning: "Tôi là học sinh." } },
  { hanzi: "你", pinyin: "nǐ", meaning: "bạn", level: "HSK 1", partOfSpeech: "đại từ", tags: ["đại từ", "cơ bản"], example: { hanzi: "你叫什么名字？", pinyin: "Nǐ jiào shénme míngzi?", meaning: "Bạn tên là gì?" } },
  { hanzi: "是", pinyin: "shì", meaning: "là", level: "HSK 1", partOfSpeech: "động từ", tags: ["động từ", "cơ bản"], example: { hanzi: "我是老师。", pinyin: "Wǒ shì lǎoshī.", meaning: "Tôi là giáo viên." } },
  { hanzi: "学生", pinyin: "xuéshēng", meaning: "học sinh, sinh viên", level: "HSK 1", partOfSpeech: "danh từ", tags: ["trường học", "nghề nghiệp"], example: { hanzi: "我是学生。", pinyin: "Wǒ shì xuéshēng.", meaning: "Tôi là học sinh." } },
  { hanzi: "老师", pinyin: "lǎoshī", meaning: "giáo viên", level: "HSK 1", partOfSpeech: "danh từ", tags: ["trường học", "nghề nghiệp"], example: { hanzi: "他是老师。", pinyin: "Tā shì lǎoshī.", meaning: "Anh ấy là giáo viên." } },
  { hanzi: "名字", pinyin: "míngzi", meaning: "tên", level: "HSK 1", partOfSpeech: "danh từ", tags: ["cơ bản"], example: { hanzi: "你叫什么名字？", pinyin: "Nǐ jiào shénme míngzi?", meaning: "Bạn tên là gì?" } },
  { hanzi: "什么", pinyin: "shénme", meaning: "gì, cái gì", level: "HSK 1", partOfSpeech: "đại từ", tags: ["đại từ", "câu hỏi"], example: { hanzi: "这是什么？", pinyin: "Zhè shì shénme?", meaning: "Đây là cái gì?" } },
  { hanzi: "中国", pinyin: "Zhōngguó", meaning: "Trung Quốc", level: "HSK 1", partOfSpeech: "danh từ", tags: ["quốc gia"], example: { hanzi: "我是中国人。", pinyin: "Wǒ shì Zhōngguó rén.", meaning: "Tôi là người Trung Quốc." } },
  { hanzi: "美国", pinyin: "Měiguó", meaning: "Mỹ, Hoa Kỳ", level: "HSK 1", partOfSpeech: "danh từ", tags: ["quốc gia"], example: { hanzi: "他是美国人。", pinyin: "Tā shì Měiguó rén.", meaning: "Anh ấy là người Mỹ." } },
  { hanzi: "人", pinyin: "rén", meaning: "người", level: "HSK 1", partOfSpeech: "danh từ", tags: ["cơ bản"], example: { hanzi: "他是中国人。", pinyin: "Tā shì Zhōngguó rén.", meaning: "Anh ấy là người Trung Quốc." } },
];

/** Dữ liệu cũ lưu "HSK1" → chuẩn hoá thành "HSK 1" (khớp ô chọn cấp độ ở form và thư viện từ vựng). */
async function normalizeLevels(): Promise<void> {
  for (let n = 1; n <= 6; n++) {
    await prisma.vocabulary.updateMany({ where: { level: `HSK${n}` }, data: { level: `HSK ${n}` } });
  }
}

/** Nạp danh sách HSK 1-3 (prisma/data/hsk-vi.txt) kèm chủ đề; chạy lại nhiều lần không tạo trùng, không ghi đè từ đã có. */
async function seedHskWords(): Promise<void> {
  const words = loadHskWords();

  const tagIds = new Map<string, string>();
  for (const t of TOPICS) {
    const tag = await prisma.tag.upsert({ where: { name: t.name }, create: { name: t.name }, update: {} });
    tagIds.set(t.name, tag.id);
  }

  const existing = await prisma.vocabulary.findMany({ select: { id: true, hanzi: true, level: true, tags: { select: { tagId: true } } } });
  const byHanzi = new Map<string, (typeof existing)[number]>(existing.map((v) => [v.hanzi, v]));

  // createdAt tăng dần theo thứ tự file để thư viện hiển thị ổn định.
  const base = Date.now();
  let created = 0;
  let updated = 0;

  for (const [i, w] of words.entries()) {
    const tagId = tagIds.get(w.topic)!;
    const found = byHanzi.get(w.hanzi);

    if (found) {
      // Từ đã có (vd seed ban đầu hoặc user tự thêm): chỉ bổ sung cấp độ/chủ đề còn thiếu.
      if (!found.level) await prisma.vocabulary.update({ where: { id: found.id }, data: { level: w.level } });
      if (!found.tags.some((t) => t.tagId === tagId)) {
        await prisma.vocabularyTag.create({ data: { vocabularyId: found.id, tagId } });
        updated++;
      }
      continue;
    }

    await prisma.vocabulary.create({
      data: {
        hanzi: w.hanzi,
        pinyin: w.pinyin,
        meaning: w.meaning,
        level: w.level,
        partOfSpeech: w.partOfSpeech,
        createdAt: new Date(base + i),
        tags: { create: [{ tagId }] },
      },
    });
    created++;
  }
  console.log(`✅ HSK 1-3: tạo mới ${created} từ, bổ sung chủ đề cho ${updated} từ đã có (tổng ${words.length} từ trong file).`);
}

async function main(): Promise<void> {
  console.log("🌱 Bắt đầu seed dữ liệu...");

  for (const ex of EXERCISES) {
    await prisma.exercise.upsert({ where: { type: ex.type }, create: ex, update: { title: ex.title, description: ex.description } });
  }
  console.log(`✅ Exercises catalog: ${EXERCISES.length} loại bài`);

  for (const a of ACHIEVEMENTS) {
    await prisma.achievement.upsert({ where: { code: a.code }, create: a, update: { name: a.name, description: a.description, icon: a.icon, xpReward: a.xpReward } });
  }
  console.log(`✅ Achievements catalog: ${ACHIEVEMENTS.length} thành tích`);

  for (const v of VOCABULARIES) {
    // Không có unique trên hanzi -> check-then-create để seed chạy nhiều lần không bị trùng.
    const existing = await prisma.vocabulary.findFirst({ where: { hanzi: v.hanzi } });
    if (existing) {
      console.log(`⏭️  Bỏ qua (đã tồn tại): ${v.hanzi}`);
      continue;
    }
    await prisma.vocabulary.create({
      data: {
        hanzi: v.hanzi,
        pinyin: v.pinyin,
        meaning: v.meaning,
        level: v.level,
        partOfSpeech: v.partOfSpeech,
        examples: { create: [{ sentenceHanzi: v.example.hanzi, sentencePinyin: v.example.pinyin, sentenceMeaning: v.example.meaning }] },
        tags: { create: v.tags.map((name) => ({ tag: { connectOrCreate: { where: { name }, create: { name } } } })) },
      },
    });
    console.log(`✅ Đã tạo: ${v.hanzi} (${v.pinyin})`);
  }

  await normalizeLevels();
  await seedHskWords();

  console.log("🌱 Seed hoàn tất.");
}

main()
  .catch((err) => {
    console.error("❌ Seed thất bại:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
