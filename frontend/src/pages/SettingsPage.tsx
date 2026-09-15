import { useState, type FormEvent } from "react";
import { LogOut } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { useToast } from "../components/ui/Toast";

const dailyGoalOptions = [
  { value: "10", label: "10 từ / ngày" },
  { value: "20", label: "20 từ / ngày" },
  { value: "30", label: "30 từ / ngày" },
  { value: "50", label: "50 từ / ngày" },
];

export default function SettingsPage() {
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);
    // TODO: nối API thật ở Phase sau (PUT /api/users/me)
    setTimeout(() => {
      setIsSaving(false);
      showToast("Đã lưu thay đổi");
    }, 500);
  }

  return (
    <div className="mx-auto max-w-xl">
      <PageHeader title="Cài đặt" description="Quản lý thông tin tài khoản và mục tiêu học tập." />

      <Card padding="lg">
        <h2 className="text-base font-semibold text-ink">Thông tin cá nhân</h2>
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
          <Input name="name" label="Tên" defaultValue="Mạnh" />
          <Input name="email" type="email" label="Email" defaultValue="manh@example.com" disabled />
          <Select name="dailyGoal" label="Mục tiêu hằng ngày" options={dailyGoalOptions} defaultValue="20" />
          <div className="mt-2">
            <Button type="submit" isLoading={isSaving}>
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </Card>

      <Card padding="lg" className="mt-6">
        <h2 className="text-base font-semibold text-ink">Đổi mật khẩu</h2>
        <div className="mt-5 flex flex-col gap-4">
          <Input type="password" label="Mật khẩu hiện tại" placeholder="••••••••" />
          <Input type="password" label="Mật khẩu mới" placeholder="••••••••" />
          <div className="mt-2">
            <Button variant="secondary">Cập nhật mật khẩu</Button>
          </div>
        </div>
      </Card>

      <Card padding="lg" className="mt-6 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-ink">Đăng xuất</h2>
          <p className="mt-1 text-sm text-ink-soft">Đăng xuất khỏi tài khoản trên thiết bị này.</p>
        </div>
        <Button variant="ghost" onClick={() => setLogoutOpen(true)}>
          <LogOut className="h-4 w-4" />
          Đăng xuất
        </Button>
      </Card>

      <Modal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        title="Đăng xuất khỏi tài khoản?"
        description="Bạn sẽ cần đăng nhập lại để tiếp tục học."
        footer={
          <>
            <Button variant="ghost" onClick={() => setLogoutOpen(false)}>
              Huỷ
            </Button>
            <Button variant="danger" onClick={() => setLogoutOpen(false)}>
              Đăng xuất
            </Button>
          </>
        }
      />
    </div>
  );
}
