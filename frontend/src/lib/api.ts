/** Client HTTP mỏng cho backend: gắn JWT, bóc `{ success, data }`, chuẩn hoá lỗi. */

const BASE_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? 'http://localhost:5000/api';
const TOKEN_KEY = 'hanzi.token';

export const tokenStore = {
  get: (): string | null => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set: (token: string) => {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch {
      /* storage bị chặn */
    }
  },
  clear: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {
      /* bỏ qua */
    }
  },
};

export class ApiError extends Error {
  status: number;
  /** Lỗi theo từng field (Zod) nếu có. */
  fieldErrors?: Record<string, string[]>;
  constructor(message: string, status: number, fieldErrors?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

type Query = Record<string, string | number | boolean | undefined | null>;

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  /** Gửi nguyên bytes (vd ảnh) thay vì JSON; Content-Type lấy từ `rawBody.type`. */
  rawBody?: Blob;
  query?: Query;
  signal?: AbortSignal;
}

/** Được gọi khi server trả 401 (token hết hạn/không hợp lệ) - AuthProvider đăng ký để đăng xuất. */
let onUnauthorized: (() => void) | null = null;
export const setUnauthorizedHandler = (fn: (() => void) | null) => {
  onUnauthorized = fn;
};

export async function request<T>(path: string, { method = 'GET', body, rawBody, query, signal }: RequestOptions = {}): Promise<T> {
  const qs = query
    ? '?' +
      Object.entries(query)
        .filter(([, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
        .join('&')
    : '';
  const token = tokenStore.get();

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}${qs === '?' ? '' : qs}`, {
      method,
      signal,
      headers: {
        ...(rawBody ? { 'Content-Type': rawBody.type } : body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: rawBody ?? (body !== undefined ? JSON.stringify(body) : undefined),
    });
  } catch (err) {
    if ((err as Error).name === 'AbortError') throw err;
    throw new ApiError('Không kết nối được máy chủ. Hãy kiểm tra backend đang chạy.', 0);
  }

  const json = (await res.json().catch(() => null)) as
    | { success: boolean; data?: T; message?: string; errors?: Record<string, string[]> }
    | null;

  if (!res.ok || !json?.success) {
    if (res.status === 401 && token && !path.startsWith('/auth/login')) onUnauthorized?.();
    throw new ApiError(json?.message ?? `Lỗi ${res.status}`, res.status, json?.errors);
  }
  return json.data as T;
}

export const get = <T,>(path: string, query?: Query, signal?: AbortSignal) => request<T>(path, { query, signal });
export const post = <T,>(path: string, body?: unknown) => request<T>(path, { method: 'POST', body: body ?? {} });
export const postBlob = <T,>(path: string, rawBody: Blob, query?: Query) => request<T>(path, { method: 'POST', rawBody, query });
export const put = <T,>(path: string, body?: unknown) => request<T>(path, { method: 'PUT', body: body ?? {} });
export const patch = <T,>(path: string, body?: unknown) => request<T>(path, { method: 'PATCH', body: body ?? {} });
export const del = <T,>(path: string, body?: unknown) => request<T>(path, { method: 'DELETE', body });
