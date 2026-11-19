import { HandwritingRecognizer } from "./types";
import { httpRecognizer } from "./httpRecognizer";

/** Điểm duy nhất chọn bộ nhận diện. Thay model/cách chạy: viết adapter mới và trả về ở đây. */
export function getRecognizer(): HandwritingRecognizer {
  return httpRecognizer;
}

export * from "./types";
