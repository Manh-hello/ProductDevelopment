import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const nextErrors: typeof errors = {};
    if (!name) nextErrors.name = "Vui lòng nhập tên của bạn";
    if (!email) nextErrors.email = "Vui lòng nhập email";
    if (password.length < 6) nextErrors.password = "Mật khẩu cần ít nhất 6 ký tự";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // TODO: nối API thật ở Phase 3 (POST /api/auth/register)
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 600);
  }

  return (
    <Card padding="lg">
      <h1 className="text-xl font-bold text-ink">Tạo tài khoản</h1>
      <p className="mt-1 text-sm text-ink-soft">Bắt đầu học tiếng Trung mỗi ngày.</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4" noValidate>
        <Input name="name" label="Tên" placeholder="Nguyễn Văn A" error={errors.name} autoComplete="name" />
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="ban@email.com"
          error={errors.email}
          autoComplete="email"
        />
        <Input
          name="password"
          type="password"
          label="Mật khẩu"
          placeholder="Ít nhất 6 ký tự"
          error={errors.password}
          autoComplete="new-password"
        />
        <Button type="submit" isLoading={isLoading} className="mt-2 w-full">
          Đăng ký
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Đã có tài khoản?{" "}
        <Link to="/login" className="font-semibold text-primary-600 hover:underline">
          Đăng nhập
        </Link>
      </p>
    </Card>
  );
}
