import { useSearchParams } from 'react-router-dom';
import PracticeRunner from './PracticeRunner';
import type { PracticeConfig } from '../../lib/usePracticeSession';
import { scopeFromParams, scopeLabel } from '../library/catalog';

interface PageConfig extends Omit<PracticeConfig, 'size'> {
  badge: string;
  title: string;
  defaultSize?: number;
  resultPath?: string;
}

/**
 * Tạo một trang luyện tập từ cấu hình; số câu có thể đổi qua `?size=`.
 * Thêm `?level=HSK 1`, `?topic=Ăn uống` hoặc `?band=beginner` để chỉ luyện các từ của một bộ từ.
 */
export default function makePracticePage(cfg: PageConfig) {
  return function PracticePage() {
    const [params] = useSearchParams();
    const size = Math.min(50, Math.max(1, Number(params.get('size')) || cfg.defaultSize || 10));
    const scope = scopeFromParams(params);
    const badge = scope ? `${cfg.badge} · ${scopeLabel(scope)}` : cfg.badge;
    return <PracticeRunner {...cfg} badge={badge} size={size} scope={scope} />;
  };
}
