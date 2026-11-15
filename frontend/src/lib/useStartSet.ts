import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { catalogApi } from '../api';
import type { CatalogScope } from '../api';
import { ApiError } from './api';
import { useAuth } from './auth';
import { scopeToQuery } from '../components/library/catalog';

export type StartMode = 'learn' | 'practice';

const TARGET: Record<StartMode, string> = { learn: '/learn', practice: '/practice/set' };

/**
 * "Học bộ này" / "Luyện tập": thêm các từ của bộ vào danh sách học (nếu chưa có) rồi mở phiên học/luyện tập theo bộ.
 * Khách chưa đăng nhập được chuyển tới /auth và quay lại thư viện đúng bộ từ đã chọn sau khi đăng nhập.
 */
export default function useStartSet() {
  const { user, loading, refreshSummary } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState<StartMode | 'all' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requireLogin = (scope: CatalogScope) => {
    navigate('/auth', { state: { from: `/library?${scopeToQuery(scope)}` } });
  };

  const start = async (mode: StartMode, scope: CatalogScope, limit = 20) => {
    if (!user) return requireLogin(scope);
    setBusy(mode);
    setError(null);
    try {
      await catalogApi.enroll({ ...scope, limit });
      void refreshSummary();
      navigate(`${TARGET[mode]}?${scopeToQuery(scope)}`);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Không bắt đầu được bộ từ này.');
    } finally {
      setBusy(null);
    }
  };

  /** Thêm toàn bộ từ của bộ vào danh sách học, không mở phiên luyện tập. */
  const addAll = async (scope: CatalogScope): Promise<string | null> => {
    if (!user) {
      requireLogin(scope);
      return null;
    }
    setBusy('all');
    setError(null);
    try {
      const r = await catalogApi.enroll({ ...scope, limit: 300 });
      void refreshSummary();
      return r.added > 0 ? `Đã thêm ${r.added} từ vào danh sách học của bạn.` : 'Bạn đã có tất cả từ của bộ này trong danh sách học.';
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Không thêm được bộ từ.');
      return null;
    } finally {
      setBusy(null);
    }
  };

  return { start, addAll, busy, error, setError, loggedIn: Boolean(user), authLoading: loading };
}
