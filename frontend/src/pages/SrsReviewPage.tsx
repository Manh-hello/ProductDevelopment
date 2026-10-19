import makePracticePage from '../components/practice/makePracticePage';

export default makePracticePage({
  sessionType: 'daily_review',
  exerciseTypes: ["FLASHCARD"],
  badge: "Ôn Tập SRS Hôm Nay",
  title: "Thẻ Ghi Nhớ (Again / Hard / Good / Easy)",
  defaultSize: 20,
  resultPath: '/review/complete',
});
