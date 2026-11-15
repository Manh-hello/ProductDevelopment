import type { ReactNode } from 'react';
import { PageLoading } from '../lib/auth';
import type { ApiState } from '../lib/useApi';

export function ErrorBox({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-space-sm rounded-xl bg-error-container text-on-error-container p-space-lg my-space-lg">
      <span className="material-symbols-outlined">error</span>
      <p className="font-body-md text-center">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="px-space-md py-2 rounded-lg bg-error text-on-error font-title-sm">
          Thử lại
        </button>
      )}
    </div>
  );
}

/** Hiển thị loading / lỗi / nội dung cho một ApiState. */
export default function PageState<T>({ state, children }: { state: ApiState<T>; children: (data: T) => ReactNode }) {
  if (state.loading && !state.data) return <PageLoading />;
  if (state.error && !state.data) return <ErrorBox message={state.error} onRetry={state.reload} />;
  if (!state.data) return null;
  return <>{children(state.data)}</>;
}

export function EmptyState({ icon = 'inbox', title, hint, action }: { icon?: string; title: string; hint?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-space-sm py-space-xl text-center text-on-surface-variant">
      <span className="material-symbols-outlined text-[48px] text-outline">{icon}</span>
      <p className="font-title-md text-on-surface">{title}</p>
      {hint && <p className="font-body-md max-w-md">{hint}</p>}
      {action}
    </div>
  );
}
