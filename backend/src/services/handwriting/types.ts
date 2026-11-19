/**
 * Hợp đồng giữa backend và "bộ nhận diện chữ viết". Route/controller/service chỉ biết interface này,
 * nên thay model (hoặc cách chạy model) chỉ cần viết thêm một adapter và đổi `getRecognizer()`.
 */
export interface RecognitionCandidate {
  /** Một chữ Hán. */
  char: string;
  /** Độ tin cậy 0..1 do model trả về. */
  confidence: number;
}

export interface RecognitionOutput {
  /** Ảnh không có nét chữ nào (model không được phép "đoán" trên ảnh trống). */
  blank: boolean;
  /** Sắp xếp giảm dần theo độ tin cậy; rỗng nếu không có dự đoán. */
  candidates: RecognitionCandidate[];
}

export type RecognizerFailure = "unavailable" | "invalid_image";

/** Lỗi do bộ nhận diện: `unavailable` = không gọi được dịch vụ/timeout/trả sai định dạng; `invalid_image` = dịch vụ không đọc được ảnh. */
export class RecognizerError extends Error {
  constructor(public readonly kind: RecognizerFailure, message: string) {
    super(message);
    this.name = "RecognizerError";
  }
}

export interface HandwritingRecognizer {
  /** Tên provider để hiển thị/log. */
  readonly name: string;
  isConfigured(): boolean;
  /** Dịch vụ có đang phản hồi không (dùng cho trang trạng thái). */
  isReachable(): Promise<boolean>;
  recognize(image: Buffer, mimeType: string): Promise<RecognitionOutput>;
  /** Tập chữ model nhận diện được; null nếu không xác định được. */
  supportedCharacters(): Promise<Set<string> | null>;
}
