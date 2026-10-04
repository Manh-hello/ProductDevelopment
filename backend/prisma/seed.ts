import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** Catalog 7 loại bài luyện tập (bảng `exercises`) - khoá `type` khớp constants/exerciseTypes.ts. */
const EXERCISES = [
  { type: "QUIZ", title: "Trắc nghiệm Hán tự → nghĩa", description: "Nhìn chữ Hán, chọn nghĩa tiếng Việt đúng." },
  { type: "REVERSE_QUIZ", title: "Trắc nghiệm nghĩa → Hán tự", description: "Nhìn nghĩa, chọn chữ Hán đúng." },
  { type: "PINYIN", title: "Luyện Pinyin", description: "Nhìn chữ Hán, chọn Pinyin đúng." },
  { type: "LISTENING", title: "Luyện nghe", description: "Nghe phát âm và chọn từ đúng." },
  { type: "WRITING", title: "Luyện viết", description: "Viết lại chữ Hán theo nét bút thuận." },
  { type: "SENTENCE", title: "Đặt câu", description: "Đặt câu với từ vựng cho sẵn." },
  { type: "SPEAKING", title: "Luyện nói", description: "Đọc to và chấm phát âm." },
  // --- Bổ sung theo giao diện hanzi-srs (usePracticeFlow.ts) - CHƯA có logic
  // sinh câu hỏi ở exercise.service.ts (mới có catalog + XP mặc định), để
  // khi nối API thật không phải thêm bảng/migration mới cho từng loại bài.
  { type: "DICTATION", title: "Chép chính tả", description: "Nghe và gõ lại đúng chữ Hán/Pinyin." },
  { type: "TRANSLATION", title: "Dịch câu", description: "Dịch câu Việt ⇄ Trung." },
  { type: "FILL_BLANK", title: "Điền vào chỗ trống", description: "Điền từ còn thiếu trong câu." },
  { type: "SENTENCE_ORDER", title: "Sắp xếp câu", description: "Sắp xếp các từ thành câu đúng ngữ pháp." },
  { type: "SENTENCE_CREATION", title: "Luyện tạo câu (AI)", description: "Đặt câu theo ngữ cảnh, chấm bằng AI." },
  { type: "TRANSLATION_HUB", title: "Dịch câu 2 chiều chuyên sâu", description: "Luyện dịch câu 2 chiều nâng cao." },
  { type: "MULTI", title: "Luyện tập đa chiều", description: "Trộn nhiều dạng bài trong 1 phiên (Mixing Engine)." },
];

/** Catalog thành tích (bảng `achievements`) - `code` khớp ACHIEVEMENT_CONDITIONS trong achievement.service.ts. */
const ACHIEVEMENTS = [
  { code: "WORDS_10", name: "Khởi đầu hành trình", description: "Học đúng 10 từ vựng đầu tiên", icon: "flag", xpReward: 50 },
  { code: "WORDS_50", name: "Người kiên trì", description: "Học đúng 50 từ vựng", icon: "military_tech", xpReward: 150 },
  { code: "WORDS_100", name: "Bậc thầy từ vựng", description: "Học đúng 100 từ vựng", icon: "workspace_premium", xpReward: 300 },
  { code: "STREAK_7", name: "Một tuần bền bỉ", description: "Duy trì chuỗi học 7 ngày liên tiếp", icon: "local_fire_department", xpReward: 100 },
  { code: "STREAK_30", name: "Kỷ luật thép", description: "Duy trì chuỗi học 30 ngày liên tiếp", icon: "bolt", xpReward: 500 },
];

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
