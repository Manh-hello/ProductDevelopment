import { useSearchParams } from 'react-router-dom';
import PracticeRunner from './PracticeRunner';
import type { PracticeConfig } from '../../lib/usePracticeSession';

interface PageConfig extends Omit<PracticeConfig, 'size'> {
  badge: string;
  title: string;
  defaultSize?: number;
  resultPath?: string;
}

/** Tạo một trang luyện tập từ cấu hình; số câu có thể đổi qua `?size=`. */
export default function makePracticePage(cfg: PageConfig) {
  return function PracticePage() {
    const [params] = useSearchParams();
    const size = Math.min(50, Math.max(1, Number(params.get('size')) || cfg.defaultSize || 10));
    return <PracticeRunner {...cfg} size={size} />;
  };
}
