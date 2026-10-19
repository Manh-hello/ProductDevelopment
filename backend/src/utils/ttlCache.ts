/**
 * Cache TTL đơn giản trong RAM (có giới hạn số phần tử, loại bỏ phần tử cũ nhất khi đầy).
 * CHỈ dùng cho dữ liệu dùng chung, KHÔNG gắn với cá nhân (vd gợi ý từ vựng theo Hán tự);
 * tuyệt đối không cache nội dung phụ thuộc vào vốn từ của một user.
 */
export class TtlCache<V> {
  private readonly store = new Map<string, { value: V; expiresAt: number }>();

  constructor(
    private readonly ttlMs: number,
    private readonly maxEntries: number
  ) {}

  get(key: string): V | undefined {
    const hit = this.store.get(key);
    if (!hit) return undefined;
    if (hit.expiresAt <= Date.now()) {
      this.store.delete(key);
      return undefined;
    }
    return hit.value;
  }

  set(key: string, value: V): void {
    if (this.store.size >= this.maxEntries && !this.store.has(key)) {
      const oldest = this.store.keys().next().value;
      if (oldest !== undefined) this.store.delete(oldest);
    }
    this.store.set(key, { value, expiresAt: Date.now() + this.ttlMs });
  }
}
