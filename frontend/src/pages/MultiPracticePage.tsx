import makePracticePage from '../components/practice/makePracticePage';

export default makePracticePage({
  sessionType: 'mixed',
  exerciseTypes: ["QUIZ", "REVERSE_QUIZ", "PINYIN", "LISTENING", "FILL_BLANK", "SENTENCE_ORDER", "DICTATION"],
  badge: "Mixing Engine 20/50/30",
  title: "Luyện Tập Đa Chiều",
  defaultSize: 20,
});
