import type { CatalogOverview, CatalogScope } from '../../api';
import { BAND_LABELS, TAB_LABELS } from './catalog';
import type { SetTab } from './catalog';

interface Props {
  overview: CatalogOverview;
  tab: SetTab;
  onTab: (t: SetTab) => void;
  /** Bộ đang chọn. */
  scope: CatalogScope;
  onSelect: (s: CatalogScope) => void;
}

const cardBase = 'text-left rounded-2xl p-space-md transition-all flex flex-col gap-1.5';
const cardOn = 'bg-primary-fixed ring-2 ring-primary shadow-md';
const cardOff = 'bg-surface-container-lowest shadow-sm hover:shadow-md';

function Progress({ learned, total }: { learned: number | null; total: number }) {
  if (learned === null || total === 0) return null;
  return (
    <div className="flex flex-col gap-1 mt-1">
      <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
        <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(100, Math.round((learned / total) * 100))}%` }} />
      </div>
      <span className="font-label-sm text-on-surface-variant">{learned}/{total} đã thêm</span>
    </div>
  );
}

/** Tab chọn cách duyệt (cấp độ HSK / chủ đề / trình độ) + lưới thẻ bộ từ. */
export default function SetPicker({ overview, tab, onTab, scope, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex flex-wrap justify-center gap-space-xs" role="tablist" aria-label="Cách duyệt từ vựng">
        {(Object.keys(TAB_LABELS) as SetTab[]).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => onTab(t)}
            className={`px-space-md py-2 rounded-full font-title-sm transition-all ${tab === t ? 'bg-primary-container text-on-primary font-bold shadow-sm' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}
          >
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>

      {tab === 'level' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-space-sm">
          {overview.levels.map((l) => {
            const empty = l.total === 0;
            const on = scope.level === l.level;
            return (
              <button key={l.level} type="button" disabled={empty} onClick={() => onSelect({ level: l.level })} className={`${cardBase} ${on ? cardOn : cardOff} ${empty ? 'opacity-60 cursor-not-allowed' : ''}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-title-md font-bold text-on-surface">{l.level}</span>
                  {l.band && <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm">{BAND_LABELS[l.band]}</span>}
                </div>
                <span className="font-label-md text-on-surface-variant">{empty ? 'Sắp có — bạn có thể tự thêm từ' : `${l.total} từ`}</span>
                <Progress learned={l.learned} total={l.total} />
              </button>
            );
          })}
        </div>
      )}

      {tab === 'topic' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-space-sm">
          {overview.topics.map((t) => (
            <button key={t.name} type="button" onClick={() => onSelect({ topic: t.name })} className={`${cardBase} ${scope.topic === t.name ? cardOn : cardOff}`}>
              <div className="flex items-center gap-space-sm">
                <span className="w-9 h-9 shrink-0 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">{t.icon}</span>
                </span>
                <span className="font-title-sm font-bold text-on-surface leading-tight">{t.name}</span>
              </div>
              <span className="font-label-md text-on-surface-variant">{t.total} từ</span>
              <Progress learned={t.learned} total={t.total} />
            </button>
          ))}
        </div>
      )}

      {tab === 'band' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
          {overview.bands.map((b) => {
            const empty = b.total === 0;
            return (
              <button key={b.key} type="button" disabled={empty} onClick={() => onSelect({ band: b.key })} className={`${cardBase} ${scope.band === b.key ? cardOn : cardOff} ${empty ? 'opacity-60 cursor-not-allowed' : ''}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-title-md font-bold text-on-surface">{b.label}</span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm">{b.levels.join(' – ')}</span>
                </div>
                <span className="font-body-sm text-on-surface-variant">{b.description}</span>
                <span className="font-label-md text-on-surface-variant">{empty ? 'Sắp có' : `${b.total} từ`}</span>
                <Progress learned={b.learned} total={b.total} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Bộ mặc định cho một tab: mục đầu tiên đã có từ. */
export function defaultScope(overview: CatalogOverview, tab: SetTab): CatalogScope {
  if (tab === 'topic') return { topic: overview.topics[0]?.name };
  if (tab === 'band') return { band: (overview.bands.find((b) => b.total > 0) ?? overview.bands[0]).key };
  return { level: (overview.levels.find((l) => l.total > 0) ?? overview.levels[0]).level };
}
