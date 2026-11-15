import type { CatalogScope } from '../../api';

export type SetTab = 'level' | 'topic' | 'band';

export const TAB_LABELS: Record<SetTab, string> = { level: 'Cấp độ HSK', topic: 'Chủ đề', band: 'Trình độ' };

export const BAND_LABELS: Record<NonNullable<CatalogScope['band']>, string> = {
  beginner: 'Sơ cấp',
  intermediate: 'Trung cấp',
  advanced: 'Cao cấp',
};

/** Đọc phạm vi bộ từ từ URL (?level= / ?topic= / ?band=). Trả undefined nếu không có. */
export function scopeFromParams(params: URLSearchParams): CatalogScope | undefined {
  const level = params.get('level') || undefined;
  const topic = params.get('topic') || undefined;
  const band = params.get('band') as CatalogScope['band'] | null;
  const validBand = band && band in BAND_LABELS ? band : undefined;
  if (!level && !topic && !validBand) return undefined;
  return { level, topic, band: validBand };
}

export function scopeToQuery(scope: CatalogScope): string {
  const p = new URLSearchParams();
  if (scope.level) p.set('level', scope.level);
  if (scope.topic) p.set('topic', scope.topic);
  if (scope.band) p.set('band', scope.band);
  return p.toString();
}

export function scopeLabel(scope: CatalogScope): string {
  return [scope.level, scope.topic, scope.band ? BAND_LABELS[scope.band] : undefined].filter(Boolean).join(' · ');
}

export function tabOfScope(scope: CatalogScope | undefined): SetTab {
  if (scope?.topic) return 'topic';
  if (scope?.band) return 'band';
  return 'level';
}
