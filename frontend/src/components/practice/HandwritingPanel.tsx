import { useEffect, useRef, useState } from 'react';
import { handwritingApi } from '../../api';
import type { HandwritingResult } from '../../api';
import { ApiError } from '../../lib/api';
import useApi from '../../lib/useApi';
import DrawPad, { DrawPadHandle } from './DrawPad';

const STATUS_LABEL: Record<HandwritingResult['status'], { text: string; tone: string }> = {
  recognized: { text: 'Đã nhận diện', tone: 'bg-secondary-container text-on-secondary-container' },
  low_confidence: { text: 'Độ tin cậy thấp', tone: 'bg-tertiary-container text-on-tertiary-container' },
  unrecognized: { text: 'Không nhận diện được', tone: 'bg-error-container text-on-error-container' },
  no_content: { text: 'Ảnh trống', tone: 'bg-error-container text-on-error-container' },
};

type Source = { kind: 'draw' } | { kind: 'file'; blob: Blob; url: string };

/**
 * Khu luyện viết: (1) tự vẽ và tự đối chiếu đáp án như trước; (2) tuỳ chọn gửi nét vẽ / ảnh tải lên cho model nhận diện.
 * Kết quả model chỉ mang tính tham khảo - không thay đổi điểm tự đánh giá, XP hay SRS.
 */
export default function HandwritingPanel({ vocabularyId }: { vocabularyId: string }) {
  const status = useApi(() => handwritingApi.status(), []);
  const pad = useRef<DrawPadHandle>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [hasInk, setHasInk] = useState(false);
  const [source, setSource] = useState<Source>({ kind: 'draw' });
  const [sentUrl, setSentUrl] = useState<string | null>(null); // ảnh đã gửi, để người học xem lại
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<HandwritingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const svc = status.data;
  const ready = Boolean(svc?.configured && svc.available);

  // Đổi câu hỏi: xoá kết quả cũ.
  useEffect(() => {
    resetAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vocabularyId]);

  // Thu hồi object URL khi không còn dùng.
  useEffect(() => () => { if (sentUrl) URL.revokeObjectURL(sentUrl); }, [sentUrl]);
  useEffect(() => () => { if (source.kind === 'file') URL.revokeObjectURL(source.url); }, [source]);

  function resetAll() {
    pad.current?.clear();
    setHasInk(false);
    setSource({ kind: 'draw' });
    setSentUrl(null);
    setResult(null);
    setError(null);
    setFileError(null);
    if (fileInput.current) fileInput.current.value = '';
  }

  const pickFile = (f: File | undefined) => {
    setFileError(null);
    if (!f || !svc) return;
    if (!svc.acceptedMimeTypes.includes(f.type)) return setFileError('Chỉ nhận ảnh PNG, JPEG hoặc WebP.');
    if (f.size > svc.maxImageBytes) return setFileError(`Ảnh quá lớn (tối đa ${(svc.maxImageBytes / 1_000_000).toFixed(1)} MB).`);
    setSource({ kind: 'file', blob: f, url: URL.createObjectURL(f) });
    setResult(null);
    setError(null);
  };

  const canSend = ready && !sending && (source.kind === 'file' || hasInk);

  const send = async () => {
    setSending(true);
    setError(null);
    setResult(null);
    try {
      const blob = source.kind === 'file' ? source.blob : await pad.current?.toBlob();
      if (!blob) throw new ApiError('Hãy viết chữ vào khung hoặc chọn một ảnh trước khi gửi.', 0);
      setSentUrl(URL.createObjectURL(blob));
      setResult(await handwritingApi.recognize(blob, vocabularyId));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Không gửi được ảnh. Vui lòng thử lại.');
    } finally {
      setSending(false);
    }
  };

  const retryable = result && result.status !== 'recognized';

  return (
    <div className="flex flex-col gap-space-md">
      <div className="inline-flex self-center items-center gap-1 rounded-full bg-surface-container px-3 py-1 font-label-sm text-on-surface-variant">
        <span className="material-symbols-outlined text-[16px]">edit</span> Tự luyện &amp; tự đối chiếu — bạn tự chấm điểm bên dưới
      </div>

      {source.kind === 'draw' ? (
        <DrawPad ref={pad} resetKey={vocabularyId} onInkChange={setHasInk} />
      ) : (
        <div className="flex flex-col items-center gap-space-sm">
          <img src={source.url} alt="Ảnh chữ viết đã chọn" className="max-h-[260px] max-w-full rounded-2xl bg-surface-container-low object-contain" />
          <button type="button" onClick={resetAll} className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant font-label-md inline-flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">delete</span> Bỏ ảnh, quay lại vẽ
          </button>
        </div>
      )}

      <section className="rounded-xl border border-outline-variant/40 p-space-md flex flex-col gap-space-sm" aria-label="Nhận diện bằng model">
        <div className="flex items-center gap-2 font-title-sm font-bold text-on-surface">
          <span className="material-symbols-outlined text-[20px] text-primary">smart_toy</span> Nhận diện bằng model (tuỳ chọn)
        </div>

        {status.loading ? (
          <p className="text-on-surface-variant font-body-sm">Đang kiểm tra dịch vụ nhận diện…</p>
        ) : status.error ? (
          <p role="alert" className="text-error font-body-sm">
            Không kiểm tra được dịch vụ nhận diện: {status.error}{' '}
            <button type="button" className="underline" onClick={status.reload}>Thử lại</button>
          </p>
        ) : !svc?.configured ? (
          <p className="text-on-surface-variant font-body-sm">Máy chủ chưa cấu hình dịch vụ nhận diện chữ viết, nên chưa có phân tích từ model. Bạn vẫn có thể tự luyện và tự đối chiếu.</p>
        ) : !svc.available ? (
          <p className="text-on-surface-variant font-body-sm">
            Dịch vụ nhận diện hiện không phản hồi. <button type="button" className="underline" onClick={status.reload}>Kiểm tra lại</button>
          </p>
        ) : (
          <>
            <p className="text-on-surface-variant font-body-sm">Model nhận diện <strong>một chữ Hán mỗi lần</strong> (viết/chọn ảnh một chữ duy nhất). Kết quả chỉ để tham khảo.</p>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={send} disabled={!canSend} className="px-4 py-2 rounded-lg bg-primary-container text-on-primary font-title-sm font-bold disabled:opacity-50 inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">{sending ? 'hourglass_top' : 'send'}</span> {sending ? 'Đang nhận diện…' : retryable || error ? 'Gửi lại' : 'Gửi nhận diện'}
              </button>
              <label className="px-4 py-2 rounded-lg bg-surface-container font-title-sm cursor-pointer inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">upload</span> Tải ảnh lên
                <input ref={fileInput} type="file" accept={svc.acceptedMimeTypes.join(',')} className="sr-only" onChange={(e) => pickFile(e.target.files?.[0])} />
              </label>
              {(result || error) && (
                <button type="button" onClick={resetAll} className="px-3 py-2 rounded-lg text-on-surface-variant font-label-md underline">Làm lại</button>
              )}
            </div>
            {fileError && <p role="alert" className="text-error font-label-md">{fileError}</p>}
            {!canSend && !sending && source.kind === 'draw' && !hasInk && <p className="text-on-surface-variant font-label-sm">Viết một chữ vào khung hoặc tải ảnh lên để gửi.</p>}
          </>
        )}

        {error && <p role="alert" className="text-error font-body-sm">{error}</p>}

        {result && (
          <div className="rounded-xl bg-surface-container-low p-space-md flex flex-col gap-space-sm" aria-live="polite">
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`px-2.5 py-1 rounded-full font-label-sm font-bold ${STATUS_LABEL[result.status].tone}`}>Model: {STATUS_LABEL[result.status].text}</span>
              {sentUrl && <img src={sentUrl} alt="Ảnh đã gửi" className="h-14 w-auto rounded-lg bg-white border border-outline-variant/40" />}
            </div>
            {result.predicted && (
              <p className="font-body-md text-on-surface">
                Chữ dự đoán: <strong className="font-display-character text-[32px] align-middle">{result.predicted.char}</strong>{' '}
                <span className="text-on-surface-variant">— độ tin cậy {(result.predicted.confidence * 100).toFixed(1)}% (ngưỡng {Math.round(result.minConfidence * 100)}%)</span>
              </p>
            )}
            {result.candidates.length > 1 && (
              <p className="font-body-sm text-on-surface-variant">
                Các khả năng khác: {result.candidates.slice(1).map((c) => `${c.char} (${(c.confidence * 100).toFixed(1)}%)`).join(', ')}
              </p>
            )}
            {result.match && (
              <p className="font-body-md text-on-surface">
                {result.match.matchesTarget === null
                  ? 'Chưa đối chiếu được với từ đang luyện.'
                  : result.match.matchesTarget
                    ? `✓ Chữ dự đoán nằm trong từ đang luyện (${result.match.targetChars.join(' ')}).`
                    : `✗ Chữ dự đoán không nằm trong từ đang luyện (${result.match.targetChars.join(' ')}).`}
              </p>
            )}
            {result.match && result.match.unsupportedChars.length > 0 && (
              <p className="font-body-sm text-on-surface-variant">Model chưa hỗ trợ nhận diện chữ: {result.match.unsupportedChars.join(' ')} — kết quả với chữ này không đáng tin.</p>
            )}
            <p className="font-body-sm text-on-surface-variant">{result.message}</p>
            {!result.analysisSupported && <p className="font-label-sm text-on-surface-variant">Model hiện chỉ nhận diện chữ, chưa phân tích lỗi nét hay thứ tự nét.</p>}
          </div>
        )}
      </section>
    </div>
  );
}
