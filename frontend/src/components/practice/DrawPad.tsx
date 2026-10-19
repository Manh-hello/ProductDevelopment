import { useEffect, useRef } from 'react';

/** Bảng vẽ đơn giản để tập viết chữ Hán (chuột/cảm ứng). Không lưu ảnh - chỉ phục vụ tự luyện rồi đối chiếu đáp án. */
export default function DrawPad({ resetKey }: { resetKey: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  const clear = () => {
    const c = ref.current;
    c?.getContext('2d')?.clearRect(0, 0, c.width, c.height);
  };
  useEffect(clear, [resetKey]);

  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = ref.current!;
    const r = c.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * c.width, y: ((e.clientY - r.top) / r.height) * c.height };
  };

  return (
    <div className="flex flex-col items-center gap-space-sm">
      <div className="relative rounded-2xl bg-surface-container-low overflow-hidden touch-none">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute left-1/2 top-0 h-full w-px bg-primary"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-primary"></div>
        </div>
        <canvas
          ref={ref}
          width={360}
          height={260}
          className="relative w-full max-w-[360px] cursor-crosshair"
          onPointerDown={(e) => {
            drawing.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            const ctx = ref.current!.getContext('2d')!;
            const { x, y } = pos(e);
            ctx.beginPath();
            ctx.moveTo(x, y);
          }}
          onPointerMove={(e) => {
            if (!drawing.current) return;
            const ctx = ref.current!.getContext('2d')!;
            const { x, y } = pos(e);
            ctx.lineWidth = 8;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.strokeStyle = '#1a1c1b';
            ctx.lineTo(x, y);
            ctx.stroke();
          }}
          onPointerUp={() => (drawing.current = false)}
          onPointerLeave={() => (drawing.current = false)}
        />
      </div>
      <button type="button" onClick={clear} className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant font-label-md inline-flex items-center gap-1">
        <span className="material-symbols-outlined text-[18px]">ink_eraser</span> Xoá nét vẽ
      </button>
    </div>
  );
}
