interface PlaceholderPageProps {
  title: string;
  phaseLabel: string;
}

/**
 * Component dùng chung cho các page chưa implement chức năng thật ở Phase 2.
 * Tái sử dụng để không lặp lại markup ở từng page.
 */
export function PlaceholderPage({ title, phaseLabel }: PlaceholderPageProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-2 text-center">
      <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
      <p className="text-gray-500">{phaseLabel}</p>
    </div>
  );
}
