import { useEffect, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { catalogApi, myWordsApi } from '../api';
import type { CatalogScope, CatalogWord } from '../api';
import PublicHeader from '../components/PublicHeader';
import { ErrorBox } from '../components/PageState';
import SetActions from '../components/library/SetActions';
import SetPicker, { defaultScope } from '../components/library/SetPicker';
import WordRow from '../components/library/WordRow';
import { scopeFromParams, scopeLabel, scopeToQuery, tabOfScope } from '../components/library/catalog';
import type { SetTab } from '../components/library/catalog';
import AppShell from '../layouts/AppShell';
import { ApiError } from '../lib/api';
import { useAuth } from '../lib/auth';
import useApi from '../lib/useApi';

const PAGE_SIZE = 30;

/** Thư viện từ vựng đầy đủ (công khai). Đã đăng nhập thì hiển thị trong khung ứng dụng, kèm nút thêm từng từ. */
export default function LibraryPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  const overview = useApi(() => catalogApi.overview(), [user?.id]);
  const urlScope = scopeFromParams(params);
  const [tab, setTab] = useState<SetTab>(tabOfScope(urlScope));

  const ov = overview.data;
  const scope: CatalogScope | null = ov ? urlScope ?? defaultScope(ov, tab) : null;
  const key = scope ? scopeToQuery(scope) : '';

  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<CatalogWord[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadTick, setReloadTick] = useState(0);

  // Tải trang đầu khi đổi bộ / từ khoá; "Xem thêm" nối thêm trang kế tiếp.
  useEffect(() => {
    if (!scope) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    catalogApi
      .words({ ...scope, search: query || undefined, page: 1, limit: PAGE_SIZE })
      .then((r) => {
        if (cancelled) return;
        setItems(r.items);
        setTotal(r.pagination.total);
        setPage(1);
      })
      .catch((e: unknown) => !cancelled && setError(e instanceof ApiError ? e.message : 'Không tải được danh sách từ.'))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, query, reloadTick, user?.id]);

  const loadMore = async () => {
    if (!scope) return;
    setLoading(true);
    try {
      const r = await catalogApi.words({ ...scope, search: query || undefined, page: page + 1, limit: PAGE_SIZE });
      setItems((all) => [...all, ...r.items]);
      setPage(page + 1);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Không tải thêm được.');
    } finally {
      setLoading(false);
    }
  };

  const select = (s: CatalogScope) => {
    setSearch('');
    setQuery('');
    setParams(scopeToQuery(s), { replace: true });
  };
  const changeTab = (t: SetTab) => {
    setTab(t);
    if (ov) select(defaultScope(ov, t));
  };
  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    setQuery(search.trim());
  };

  const addWord = async (w: CatalogWord) => {
    if (!user) {
      navigate('/auth', { state: { from: `/library?${key}` } });
      return;
    }
    try {
      await myWordsApi.add(w.id);
    } catch (e) {
      if (!(e instanceof ApiError && e.status === 409)) {
        setError(e instanceof ApiError ? e.message : 'Không thêm được từ.');
        return;
      }
    }
    setItems((all) => all.map((x) => (x.id === w.id ? { ...x, inMyList: true } : x)));
    overview.reload();
  };

  const body = (
    <div className="max-w-5xl mx-auto flex flex-col gap-space-lg pb-space-xl">
      <div>
        <span className="font-label-sm uppercase tracking-wider text-primary font-bold">Kho từ chung</span>
        <h1 className="font-headline-xl text-headline-xl font-bold">Thư Viện Từ Vựng HSK</h1>
        <p className="text-on-surface-variant font-body-md">Duyệt từ theo cấp độ HSK, chủ đề hoặc trình độ. Thêm từng từ, hoặc học cả bộ để đưa vào lộ trình SRS.</p>
      </div>

      {overview.error && !ov && <ErrorBox message={overview.error} onRetry={overview.reload} />}
      {overview.loading && !ov && <p className="text-on-surface-variant font-body-md">Đang tải thư viện...</p>}
      {ov && ov.totalWords === 0 && (
        <p className="text-on-surface-variant font-body-md">Thư viện chưa có dữ liệu. Chạy <code>npm run prisma:seed</code> ở backend để nạp từ vựng HSK 1–3.</p>
      )}

      {ov && ov.totalWords > 0 && scope && (
        <>
          <SetPicker overview={ov} tab={tab} onTab={changeTab} scope={scope} onSelect={select} />

          <div className="bg-surface-container-lowest rounded-2xl p-space-md sm:p-space-lg shadow-md flex flex-col gap-space-md">
            <div className="flex flex-wrap items-start justify-between gap-space-md">
              <div>
                <h2 className="font-title-md font-bold text-on-surface">{scopeLabel(scope)}</h2>
                <p className="font-label-md text-on-surface-variant">{total} từ{query ? ` khớp "${query}"` : ''}</p>
              </div>
              <form onSubmit={onSearch} className="relative w-full sm:w-72">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm Hán tự, Pinyin, nghĩa..." className="w-full pl-10 pr-space-md py-2 rounded-lg bg-surface-container border-none text-on-surface placeholder:text-on-surface-variant font-body-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </form>
            </div>

            <SetActions scope={scope} showAddAll onChanged={() => { setReloadTick((t) => t + 1); overview.reload(); }} />

            {error && <ErrorBox message={error} onRetry={() => setReloadTick((t) => t + 1)} />}

            <div className="flex flex-col gap-space-xs">
              {items.map((w) => (
                <WordRow
                  key={w.id}
                  word={w}
                  onAdded={(id) => { setItems((all) => all.map((x) => (x.id === id ? { ...x, inMyList: true } : x))); overview.reload(); }}
                  action={
                    w.inMyList ? (
                      <Link to={`/vocabulary/${w.id}`} className="shrink-0 px-3 py-1.5 rounded-lg bg-secondary-container text-on-secondary-container font-label-md">Đã có</Link>
                    ) : (
                      <button type="button" onClick={() => void addWord(w)} className="shrink-0 px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-md font-bold">Thêm</button>
                    )
                  }
                />
              ))}
              {!loading && !error && items.length === 0 && <p className="text-center text-on-surface-variant font-body-md py-space-lg">Không có từ nào khớp.</p>}
            </div>

            {items.length < total && (
              <button type="button" onClick={() => void loadMore()} disabled={loading} className="self-center px-space-lg py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high font-title-sm font-bold disabled:opacity-60">
                {loading ? 'Đang tải...' : `Xem thêm (${total - items.length} từ)`}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );

  return <Shell loggedIn={Boolean(user)}>{body}</Shell>;
}

function Shell({ loggedIn, children }: { loggedIn: boolean; children: ReactNode }) {
  if (loggedIn) return <AppShell>{children}</AppShell>;
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="px-gutter-sm sm:px-gutter py-space-lg">{children}</main>
    </div>
  );
}
