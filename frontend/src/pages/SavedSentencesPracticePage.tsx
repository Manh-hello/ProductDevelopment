import makePracticePage from '../components/practice/makePracticePage';

/** Luyện từ các câu đã lưu: dùng đúng practice engine hiện có (Điền từ / Sắp xếp / Dịch), chỉ khác nguồn câu nền. */
export default makePracticePage({
  sessionType: 'practice',
  sentenceSource: 'saved',
  exerciseTypes: ['FILL_BLANK', 'SENTENCE_ORDER', 'TRANSLATION', 'TRANSLATION_HUB'],
  badge: 'Câu đã lưu',
  title: 'Luyện Từ Câu Đã Lưu',
  defaultSize: 10,
});
