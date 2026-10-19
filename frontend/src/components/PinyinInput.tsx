import { forwardRef, useEffect, useRef } from 'react';
import { pinyinApi } from '../api';
import type { PinyinStyle } from '../api';

/** Có Hán tự hoặc Pinyin số thanh (lao3shi1) → cần chuyển sang Pinyin có dấu. */
const NEEDS_CONVERT = /[\u3400-\u9fff\uf900-\ufaff]|[a-züv:]+[1-5]/i;
const DEBOUNCE_MS = 350;

interface Props {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  /** word: lǎoshī (từ) | sentence: wǒ ài nǐ (câu). */
  style?: PinyinStyle;
}

/**
 * Ô nhập Pinyin: luôn hiển thị Pinyin, không bị "nhảy" thành chữ Hán.
 *  - Gõ số thanh: `lao3shi1` → `lǎoshī` (gõ `v` hoặc `u:` cho ü: `nv3` → `nǚ`).
 *  - Bàn phím tiếng Trung (IME) làm ra chữ Hán → tự đổi lại thành Pinyin qua API `/pinyin/convert`.
 * Không gọi API trong lúc đang gõ IME (composition) để không phá chữ đang soạn.
 */
const PinyinInput = forwardRef<HTMLInputElement, Props>(function PinyinInput(
  { value, onChange, style = 'word', ...rest },
  ref
) {
  const composing = useRef(false);
  const latest = useRef(value);
  const timer = useRef<number | undefined>(undefined);
  latest.current = value;

  const convert = async (text: string) => {
    if (!text.trim() || !NEEDS_CONVERT.test(text)) return;
    try {
      const res = await pinyinApi.convert(text, style);
      // Chỉ áp dụng nếu người dùng chưa gõ thêm gì trong lúc chờ API.
      if (latest.current === text) onChange(res.pinyin);
    } catch {
      /* lỗi mạng: giữ nguyên nội dung đã gõ */
    }
  };

  const schedule = (text: string) => {
    window.clearTimeout(timer.current);
    if (composing.current) return;
    timer.current = window.setTimeout(() => void convert(text), DEBOUNCE_MS);
  };

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <input
      {...rest}
      ref={ref}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
        schedule(e.target.value);
      }}
      onCompositionStart={() => {
        composing.current = true;
        window.clearTimeout(timer.current);
      }}
      onCompositionEnd={(e) => {
        composing.current = false;
        const text = e.currentTarget.value;
        onChange(text);
        schedule(text);
      }}
      onBlur={() => {
        window.clearTimeout(timer.current);
        void convert(latest.current);
      }}
      lang="vi"
      inputMode="text"
      autoCapitalize="off"
      autoCorrect="off"
      autoComplete="off"
      spellCheck={false}
    />
  );
});

export default PinyinInput;
