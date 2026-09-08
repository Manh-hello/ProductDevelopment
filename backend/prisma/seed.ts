import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * 10 từ tiếng Trung cơ bản, dùng để seed dữ liệu ban đầu.
 * Đây là các từ thuộc kho CHUNG -> createdByUserId = null.
 */
const baseVocabularies = [
  {
    hanzi: "我",
    pinyin: "wǒ",
    meaning: "tôi",
    example: "我是学生。",
    examplePinyin: "Wǒ shì xuéshēng.",
    exampleMeaning: "Tôi là học sinh.",
  },
  {
    hanzi: "你",
    pinyin: "nǐ",
    meaning: "bạn",
    example: "你叫什么名字？",
    examplePinyin: "Nǐ jiào shénme míngzi?",
    exampleMeaning: "Bạn tên là gì?",
  },
  {
    hanzi: "是",
    pinyin: "shì",
    meaning: "là",
    example: "我是老师。",
    examplePinyin: "Wǒ shì lǎoshī.",
    exampleMeaning: "Tôi là giáo viên.",
  },
  {
    hanzi: "学生",
    pinyin: "xuéshēng",
    meaning: "học sinh, sinh viên",
    example: "我是学生。",
    examplePinyin: "Wǒ shì xuéshēng.",
    exampleMeaning: "Tôi là học sinh.",
  },
  {
    hanzi: "老师",
    pinyin: "lǎoshī",
    meaning: "giáo viên",
    example: "他是老师。",
    examplePinyin: "Tā shì lǎoshī.",
    exampleMeaning: "Anh ấy là giáo viên.",
  },
  {
    hanzi: "名字",
    pinyin: "míngzi",
    meaning: "tên",
    example: "你叫什么名字？",
    examplePinyin: "Nǐ jiào shénme míngzi?",
    exampleMeaning: "Bạn tên là gì?",
  },
  {
    hanzi: "什么",
    pinyin: "shénme",
    meaning: "gì, cái gì",
    example: "这是什么？",
    examplePinyin: "Zhè shì shénme?",
    exampleMeaning: "Đây là cái gì?",
  },
  {
    hanzi: "中国",
    pinyin: "Zhōngguó",
    meaning: "Trung Quốc",
    example: "我是中国人。",
    examplePinyin: "Wǒ shì Zhōngguó rén.",
    exampleMeaning: "Tôi là người Trung Quốc.",
  },
  {
    hanzi: "美国",
    pinyin: "Měiguó",
    meaning: "Mỹ, Hoa Kỳ",
    example: "他是美国人。",
    examplePinyin: "Tā shì Měiguó rén.",
    exampleMeaning: "Anh ấy là người Mỹ.",
  },
  {
    hanzi: "人",
    pinyin: "rén",
    meaning: "người",
    example: "他是中国人。",
    examplePinyin: "Tā shì Zhōngguó rén.",
    exampleMeaning: "Anh ấy là người Trung Quốc.",
  },
];

async function main(): Promise<void> {
  console.log("🌱 Bắt đầu seed dữ liệu...");

  for (const vocab of baseVocabularies) {
    // Không có unique constraint trên `hanzi` (một chữ Hán có thể lặp lại
    // trong tương lai với nghĩa/ví dụ khác do user tự tạo), nên seed
    // dùng điều kiện "hanzi + thuộc kho chung (createdByUserId = null)"
    // để tránh tạo trùng khi seed chạy nhiều lần.
    const existing = await prisma.vocabulary.findFirst({
      where: { hanzi: vocab.hanzi, createdByUserId: null },
    });

    if (existing) {
      console.log(`⏭️  Bỏ qua (đã tồn tại): ${vocab.hanzi}`);
      continue;
    }

    await prisma.vocabulary.create({
      data: { ...vocab, createdByUserId: null },
    });
    console.log(`✅ Đã tạo: ${vocab.hanzi} (${vocab.pinyin})`);
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
