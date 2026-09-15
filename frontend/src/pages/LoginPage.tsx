import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const nextErrors: typeof errors = {};
    if (!email) nextErrors.email = "Vui lòng nhập email";
    if (!password) nextErrors.password = "Vui lòng nhập mật khẩu";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // TODO: nối API thật ở Phase 3 (POST /api/auth/login)
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 600);
  }

  return (
    <Card padding="lg">
      <h1 className="text-xl font-bold text-ink">Đăng nhập</h1>
      <p className="mt-1 text-sm text-ink-soft">Tiếp tục hành trình học tiếng Trung của bạn.</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4" noValidate>
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
          placeholder="••••••••"
          error={errors.password}
          autoComplete="current-password"
        />
        <Button type="submit" isLoading={isLoading} className="mt-2 w-full">
          Đăng nhập
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Chưa có tài khoản?{" "}
        <Link to="/register" className="font-semibold text-primary-600 hover:underline">
          Đăng ký
        </Link>
      </p>
    </Card>
  );
}
