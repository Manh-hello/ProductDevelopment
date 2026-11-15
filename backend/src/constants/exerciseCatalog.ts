/** Catalog các LOẠI bài (bảng `exercises`). Dùng chung cho seed và cho cơ chế tự bù thiếu (ensureExercises). */
export const EXERCISE_CATALOG = [
  { type: "QUIZ", title: "Trắc nghiệm Hán tự → nghĩa", description: "Nhìn chữ Hán, chọn nghĩa tiếng Việt đúng." },
  { type: "REVERSE_QUIZ", title: "Trắc nghiệm nghĩa → Hán tự", description: "Nhìn nghĩa, chọn chữ Hán đúng." },
  { type: "PINYIN", title: "Luyện Pinyin", description: "Nhìn chữ Hán, chọn Pinyin đúng." },
  { type: "LISTENING", title: "Luyện nghe", description: "Nghe phát âm và chọn từ đúng." },
  { type: "WRITING", title: "Luyện viết", description: "Viết lại chữ Hán theo nét bút thuận." },
  { type: "SENTENCE", title: "Đặt câu", description: "Đặt câu với từ vựng cho sẵn." },
  { type: "SPEAKING", title: "Luyện nói", description: "Đọc to và chấm phát âm." },
  { type: "DICTATION", title: "Chép chính tả", description: "Nghe và gõ lại đúng chữ Hán/Pinyin." },
  { type: "TRANSLATION", title: "Dịch câu Trung → Việt", description: "Chọn bản dịch tiếng Việt đúng của câu tiếng Trung." },
  { type: "FILL_BLANK", title: "Điền vào chỗ trống", description: "Điền từ còn thiếu trong câu." },
  { type: "SENTENCE_ORDER", title: "Sắp xếp câu", description: "Sắp xếp các từ thành câu đúng ngữ pháp." },
  { type: "SENTENCE_CREATION", title: "Luyện tạo câu", description: "Tự đặt câu có chứa từ cho trước." },
  { type: "TRANSLATION_HUB", title: "Dịch câu Việt → Trung", description: "Gõ câu tiếng Trung từ nghĩa tiếng Việt." },
  { type: "MULTI", title: "Luyện tập đa chiều", description: "Trộn nhiều dạng bài trong 1 phiên (Mixing Engine)." },
  { type: "FLASHCARD", title: "Thẻ ghi nhớ SRS", description: "Lật thẻ và tự đánh giá mức nhớ (Again/Hard/Good/Easy)." },
];
