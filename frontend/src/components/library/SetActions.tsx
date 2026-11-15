import { useState } from 'react';
import type { CatalogScope } from '../../api';
import useStartSet from '../../lib/useStartSet';

interface Props {
  scope: CatalogScope;
  /** Hiện thêm nút "Thêm cả bộ" (trang Thư viện đầy đủ). */
  showAddAll?: boolean;
  onChanged?: () => void;
}

/** Nút hành động cho một bộ từ: Học bộ này · Luyện tập · (Thêm cả bộ). */
export default function SetActions({ scope, showAddAll, onChanged }: Props) {
  const { start, addAll, busy, error, loggedIn, authLoading } = useStartSet();
  const [note, setNote] = useState<string | null>(null);
  const disabled = busy !== null || authLoading;

  return (
    <div className="flex flex-col gap-space-xs">
      <div className="flex flex-wrap gap-space-sm">
        <button type="button" disabled={disabled} onClick={() => void start('learn', scope)} className="inline-flex items-center gap-1.5 px-space-md py-2.5 rounded-lg bg-primary-container text-on-primary font-title-sm font-bold shadow-sm hover:bg-primary transition-colors disabled:opacity-60">
          <span className="material-symbols-outlined text-[18px]">school</span>
          {busy === 'learn' ? 'Đang chuẩn bị...' : 'Học bộ này'}
        </button>
        <button type="button" disabled={disabled} onClick={() => void start('practice', scope)} className="inline-flex items-center gap-1.5 px-space-md py-2.5 rounded-lg bg-secondary-container text-on-secondary-container font-title-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-60">
          <span className="material-symbols-outlined text-[18px]">model_training</span>
          {busy === 'practice' ? 'Đang chuẩn bị...' : 'Luyện tập'}
        </button>
        {showAddAll && (
          <button
            type="button"
            disabled={disabled}
            onClick={async () => {
              const msg = await addAll(scope);
              if (msg) {
                setNote(msg);
                onChanged?.();
              }
            }}
            className="inline-flex items-center gap-1.5 px-space-md py-2.5 rounded-lg bg-surface-container text-on-surface font-title-sm hover:bg-surface-container-high transition-colors disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-[18px]">playlist_add</span>
            {busy === 'all' ? 'Đang thêm...' : 'Thêm cả bộ vào danh sách'}
          </button>
        )}
      </div>
      {!loggedIn && !authLoading && <p className="font-label-sm text-on-surface-variant">Đăng nhập (miễn phí) để lưu bộ từ và theo dõi tiến độ ghi nhớ SRS.</p>}
      {loggedIn && <p className="font-label-sm text-on-surface-variant">"Học bộ này" thêm 20 từ mới tiếp theo của bộ vào danh sách học của bạn rồi mở thẻ ghi nhớ.</p>}
      {note && <p role="status" className="font-body-sm text-secondary font-bold">{note}</p>}
      {error && <p role="alert" className="font-body-sm text-error">{error}</p>}
    </div>
  );
}
