import makePracticePage from '../components/practice/makePracticePage';

/** Học từ mới theo bộ từ (thẻ ghi nhớ lật mặt). Dùng ?level= / ?topic= / ?band= để chọn bộ. */
export default makePracticePage({
  sessionType: 'practice',
  exerciseTypes: ['FLASHCARD'],
  badge: 'Học từ mới',
  title: 'Học Bộ Từ Vựng (Thẻ Ghi Nhớ)',
  defaultSize: 20,
});
