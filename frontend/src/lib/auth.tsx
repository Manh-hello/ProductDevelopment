import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authApi, dashboardApi } from '../api';
import { setUnauthorizedHandler, tokenStore } from './api';
import type { DashboardSummary, User } from './types';

interface AuthContextValue {
  user: User | null;
  /** Số liệu hiển thị ở header (streak, XP, từ cần ôn...) - làm mới bằng refreshSummary(). */
  summary: DashboardSummary | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (body: { name: string; email: string; password: string; dailyGoal?: number; level?: string }) => Promise<void>;
  logout: () => void;
  setUser: (u: User) => void;
  refreshSummary: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(Boolean(tokenStore.get()));

  const logout = useCallback(() => {
    tokenStore.clear();
    setUser(null);
    setSummary(null);
  }, []);

  const refreshSummary = useCallback(async () => {
    try {
      setSummary(await dashboardApi.summary());
    } catch {
      /* header chỉ là phụ trợ, bỏ qua lỗi */
    }
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(logout);
    return () => setUnauthorizedHandler(null);
  }, [logout]);

  useEffect(() => {
    if (!tokenStore.get()) return;
    authApi
      .me()
      .then((u) => {
        setUser(u);
        void refreshSummary();
      })
      .catch(() => tokenStore.clear())
      .finally(() => setLoading(false));
  }, [refreshSummary]);

  const afterAuth = useCallback(
    async (res: { user: User; token: string }) => {
      tokenStore.set(res.token);
      setUser(res.user);
      await refreshSummary();
    },
    [refreshSummary]
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      summary,
      loading,
      login: async (email, password) => afterAuth(await authApi.login(email, password)),
      register: async (body) => afterAuth(await authApi.register(body)),
      logout,
      setUser,
      refreshSummary,
    }),
    [user, summary, loading, afterAuth, logout, refreshSummary]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth phải nằm trong <AuthProvider>');
  return ctx;
}

/** Chặn các route cần đăng nhập; chuyển về /auth và nhớ trang đang vào. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <PageLoading />;
  if (!user) return <Navigate to="/auth" replace state={{ from: location.pathname + location.search }} />;
  return <>{children}</>;
}

export function PageLoading({ label = 'Đang tải...' }: { label?: string }) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-on-surface-variant font-body-md">
      <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
      {label}
    </div>
  );
}
