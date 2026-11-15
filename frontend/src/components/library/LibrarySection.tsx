import { useState } from 'react';
import { Link } from 'react-router-dom';
import { catalogApi } from '../../api';
import type { CatalogScope } from '../../api';
import useApi from '../../lib/useApi';
import { ErrorBox } from '../PageState';
import SetActions from './SetActions';
import SetPicker, { defaultScope } from './SetPicker';
import WordRow from './WordRow';
import { scopeLabel, scopeToQuery } from './catalog';
import type { SetTab } from './catalog';

const PREVIEW = 8;

/** Khối "Thư viện từ vựng" trên trang chủ: dữ liệu thật từ backend/database (public, không cần đăng nhập để xem). */
/**
 * `embedded`: dùng bên trong Dashboard (thẻ gọn, tiêu đề căn trái). Mặc định: khối căn giữa trên trang chủ.
 */
export default function LibrarySection({ embedded = false }: { embedded?: boolean }) {
  const overview = useApi(() => catalogApi.overview());
  const [tab, setTab] = useState<SetTab>('level');
  const [picked, setPicked] = useState<CatalogScope | null>(null);

  const ov = overview.data;
  const scope: CatalogScope | null = ov ? picked ?? defaultScope(ov, tab) : null;
  const key = scope ? scopeToQuery(scope) : '';
  const words = useApi(() => (scope ? catalogApi.words({ ...scope, limit: PREVIEW }) : Promise.resolve(null)), [key]);

  const changeTab = (t: SetTab) => {
    setTab(t);
    setPicked(null);
  };

  const total = ov ? `${ov.totalWords.toLocaleString('vi-VN')} từ` : 'Từ vựng';
  const Wrapper = 'section';

  return (
    <Wrapper
      className={embedded ? 'rounded-xl bg-surface-container-lowest p-gutter shadow-sm flex flex-col gap-space-md' : 'w-full px-gutter-sm sm:px-gutter py-space-xl'}
      id={embedded ? 'dashboard-library' : 'vocab-library'}
    >
      {embedded ? (
        <div className="flex flex-wrap items-end justify-between gap-space-sm">
          <div>
            <span className="font-label-sm uppercase tracking-widest text-primary font-bold">Thư Viện Từ Vựng</span>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Từ vựng theo chủ đề, cấp độ HSK và trình độ</h2>
            <p className="font-body-sm text-on-surface-variant">{total} có Hán tự, Pinyin và nghĩa tiếng Việt. Bấm vào một từ để xem chi tiết, hoặc chọn một bộ để học và luyện tập.</p>
          </div>
          <Link to="/library" className="inline-flex items-center gap-1 text-primary font-title-sm font-bold hover:underline">
            Mở thư viện đầy đủ <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      ) : (
        <div className="text-center max-w-2xl mx-auto mb-space-lg">
          <span className="font-label-sm uppercase tracking-widest text-primary font-bold">Thư Viện Từ Vựng</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1 font-bold">Chọn Bộ Từ Phù Hợp Với Trình Độ Của Bạn</h2>
          <p className="font-body-md text-on-surface-variant mt-2">
            {total} có Hán tự, Pinyin và nghĩa tiếng Việt, sắp xếp theo cấp độ HSK, chủ đề và trình độ người học. Chọn một bộ rồi bấm học hoặc luyện tập ngay.
          </p>
        </div>
      )}

      <div className={embedded ? "flex flex-col gap-space-md" : "max-w-5xl mx-auto flex flex-col gap-space-lg"}>
        {overview.loading && !ov && <p className="text-center text-on-surface-variant font-body-md">Đang tải thư viện từ vựng...</p>}
        {overview.error && !ov && <ErrorBox message={overview.error} onRetry={overview.reload} />}

        {ov && ov.totalWords === 0 && (
          <p className="text-center text-on-surface-variant font-body-md">Thư viện chưa có dữ liệu. Chạy <code>npm run prisma:seed</code> ở backend để nạp từ vựng HSK.</p>
        )}

        {ov && ov.totalWords > 0 && scope && (
          <>
            <SetPicker overview={ov} tab={tab} onTab={changeTab} scope={scope} onSelect={setPicked} />

            <div className={embedded ? "rounded-xl bg-surface-container-low/50 p-space-sm sm:p-space-md flex flex-col gap-space-md" : "bg-surface-container-lowest rounded-2xl p-space-md sm:p-space-lg shadow-md flex flex-col gap-space-md"}>
              <div className="flex flex-wrap items-center justify-between gap-space-sm">
                <div>
                  <h3 className="font-title-md font-bold text-on-surface">{scopeLabel(scope)}</h3>
                  <p className="font-label-md text-on-surface-variant">
                    {words.data ? `${words.data.pagination.total} từ · hiển thị ${Math.min(PREVIEW, words.data.items.length)} từ đầu` : 'Đang tải...'}
                  </p>
                </div>
                <Link to={`/library?${key}`} className="inline-flex items-center gap-1 text-primary font-title-sm font-bold hover:underline">
                  Xem toàn bộ danh sách <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>

              {words.error && !words.data && <ErrorBox message={words.error} onRetry={words.reload} />}
              {words.data && (
                <div className="flex flex-col gap-space-xs">
                  {words.data.items.map((w) => <WordRow key={w.id} word={w} />)}
                </div>
              )}

              <SetActions scope={scope} />
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
}
