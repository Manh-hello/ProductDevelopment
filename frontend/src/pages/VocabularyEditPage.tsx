import { useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/EmptyState";
import { useToast } from "../components/ui/Toast";
import { mockVocabularies } from "../data/mockVocabulary";
import { FileQuestion } from "lucide-react";

interface FormErrors {
  hanzi?: string;
  pinyin?: string;
  meaning?: string;
}

export default function VocabularyEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const vocabulary = mockVocabularies.find((v) => v.id === id);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  if (!vocabulary) {
    return (
      <EmptyState
        icon={FileQuestion}
        title="Không tìm thấy từ vựng"
        description="Từ vựng bạn muốn chỉnh sửa có thể đã bị xoá."
        action={
          <Button variant="secondary" size="sm" onClick={() => navigate("/vocabulary")}>
            Về danh sách từ vựng
          </Button>
        }
      />
    );
  }

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

    // TODO: nối API thật ở Phase 4 (PUT /api/vocabularies/:id)
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast(`Đã cập nhật "${hanzi}"`);
      navigate("/vocabulary");
    }, 500);
  }

  return (
    <div className="mx-auto max-w-xl">
      <PageHeader title="Sửa từ vựng" description="Cập nhật thông tin cho từ vựng này." />

      <Card padding="lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          <Input
            name="hanzi"
            label="Hán tự"
            defaultValue={vocabulary.hanzi}
            error={errors.hanzi}
            className="font-hanzi text-lg"
          />
          <Input name="pinyin" label="Pinyin" defaultValue={vocabulary.pinyin} error={errors.pinyin} />
          <Input name="meaning" label="Nghĩa tiếng Việt" defaultValue={vocabulary.meaning} error={errors.meaning} />
          <Textarea
            name="example"
            label="Câu ví dụ (không bắt buộc)"
            defaultValue={vocabulary.example}
            rows={2}
          />
          <Textarea
            name="notes"
            label="Ghi chú (không bắt buộc)"
            defaultValue={vocabulary.notes}
            rows={2}
          />

          <div className="mt-2 flex gap-3">
            <Button type="submit" isLoading={isSaving}>
              Lưu thay đổi
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
