import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Button } from "../components/ui/Button";
import { useToast } from "../components/ui/Toast";

interface FormErrors {
  hanzi?: string;
  pinyin?: string;
  meaning?: string;
}

export default function VocabularyAddPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const hanzi = String(formData.get("hanzi") ?? "").trim();
    const pinyin = String(formData.get("pinyin") ?? "").trim();
    const meaning = String(formData.get("meaning") ?? "").trim();

    const nextErrors: FormErrors = {};
    if (!hanzi) nextErrors.hanzi = "Vui lòng nhập Hán tự";
    if (!pinyin) nextErrors.pinyin = "Vui lòng nhập Pinyin";
    if (!meaning) nextErrors.meaning = "Vui lòng nhập nghĩa tiếng Việt";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // TODO: nối API thật ở Phase 4 (POST /api/vocabularies)
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast(`Đã thêm "${hanzi}" vào danh sách từ vựng`);
      navigate("/vocabulary");
    }, 500);
  }

  return (
    <div className="mx-auto max-w-xl">
      <PageHeader title="Thêm từ vựng mới" description="Thêm một từ tiếng Trung vào kho từ vựng của bạn." />

      <Card padding="lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          <Input name="hanzi" label="Hán tự" placeholder="学生" error={errors.hanzi} className="font-hanzi text-lg" />
          <Input name="pinyin" label="Pinyin" placeholder="xuéshēng" error={errors.pinyin} />
          <Input name="meaning" label="Nghĩa tiếng Việt" placeholder="học sinh" error={errors.meaning} />
          <Textarea
            name="example"
            label="Câu ví dụ (không bắt buộc)"
            placeholder="我是学生。"
            rows={2}
          />
          <Textarea
            name="notes"
            label="Ghi chú (không bắt buộc)"
            placeholder="Mẹo ghi nhớ, ngữ cảnh sử dụng..."
            rows={2}
          />

          <div className="mt-2 flex gap-3">
            <Button type="submit" isLoading={isSaving}>
              Lưu từ vựng
            </Button>
            <Button type="button" variant="ghost" onClick={() => navigate("/vocabulary")}>
              Huỷ
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
