import makePracticePage from '../components/practice/makePracticePage';

/** Luyện tập theo bộ từ: trắc nghiệm thuận/ngược + Pinyin (hoạt động ngay cả khi từ chưa có câu ví dụ). */
export default makePracticePage({
  sessionType: 'practice',
  exerciseTypes: ['QUIZ', 'REVERSE_QUIZ', 'PINYIN'],
  badge: 'Luyện tập',
  title: 'Luyện Tập Theo Bộ Từ',
  defaultSize: 15,
});
