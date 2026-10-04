/** Đọc to bằng Web Speech API (giọng Trung Quốc). Bỏ qua nếu trình duyệt không hỗ trợ. */
export function speak(text: string, rate = 0.85) {
  if (!text || !('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'zh-CN';
  u.rate = rate;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}
