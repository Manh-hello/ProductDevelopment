import { PrismaClient } from "@prisma/client";
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
  { hanzi: "我", pinyin: "wǒ", meaning: "tôi", level: "HSK1", partOfSpeech: "đại từ", tags: ["đại từ", "cơ bản"], example: { hanzi: "我是学生。", pinyin: "Wǒ shì xuéshēng.", meaning: "Tôi là học sinh." } },
  { hanzi: "你", pinyin: "nǐ", meaning: "bạn", level: "HSK1", partOfSpeech: "đại từ", tags: ["đại từ", "cơ bản"], example: { hanzi: "你叫什么名字？", pinyin: "Nǐ jiào shénme míngzi?", meaning: "Bạn tên là gì?" } },
  { hanzi: "是", pinyin: "shì", meaning: "là", level: "HSK1", partOfSpeech: "động từ", tags: ["động từ", "cơ bản"], example: { hanzi: "我是老师。", pinyin: "Wǒ shì lǎoshī.", meaning: "Tôi là giáo viên." } },
  { hanzi: "学生", pinyin: "xuéshēng", meaning: "học sinh, sinh viên", level: "HSK1", partOfSpeech: "danh từ", tags: ["trường học", "nghề nghiệp"], example: { hanzi: "我是学生。", pinyin: "Wǒ shì xuéshēng.", meaning: "Tôi là học sinh." } },
  { hanzi: "老师", pinyin: "lǎoshī", meaning: "giáo viên", level: "HSK1", partOfSpeech: "danh từ", tags: ["trường học", "nghề nghiệp"], example: { hanzi: "他是老师。", pinyin: "Tā shì lǎoshī.", meaning: "Anh ấy là giáo viên." } },
  { hanzi: "名字", pinyin: "míngzi", meaning: "tên", level: "HSK1", partOfSpeech: "danh từ", tags: ["cơ bản"], example: { hanzi: "你叫什么名字？", pinyin: "Nǐ jiào shénme míngzi?", meaning: "Bạn tên là gì?" } },
  { hanzi: "什么", pinyin: "shénme", meaning: "gì, cái gì", level: "HSK1", partOfSpeech: "đại từ", tags: ["đại từ", "câu hỏi"], example: { hanzi: "这是什么？", pinyin: "Zhè shì shénme?", meaning: "Đây là cái gì?" } },
  { hanzi: "中国", pinyin: "Zhōngguó", meaning: "Trung Quốc", level: "HSK1", partOfSpeech: "danh từ", tags: ["quốc gia"], example: { hanzi: "我是中国人。", pinyin: "Wǒ shì Zhōngguó rén.", meaning: "Tôi là người Trung Quốc." } },
  { hanzi: "美国", pinyin: "Měiguó", meaning: "Mỹ, Hoa Kỳ", level: "HSK1", partOfSpeech: "danh từ", tags: ["quốc gia"], example: { hanzi: "他是美国人。", pinyin: "Tā shì Měiguó rén.", meaning: "Anh ấy là người Mỹ." } },
  { hanzi: "人", pinyin: "rén", meaning: "người", level: "HSK1", partOfSpeech: "danh từ", tags: ["cơ bản"], example: { hanzi: "他是中国人。", pinyin: "Tā shì Zhōngguó rén.", meaning: "Anh ấy là người Trung Quốc." } },
];

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
