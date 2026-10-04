import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { FormEvent } from 'react';

export default function AuthPage() {
  const navigate = useNavigate();
  const [reg, setReg] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const email = f.elements.namedItem('email') as HTMLInputElement;
    const pw = f.elements.namedItem('password') as HTMLInputElement;
    email.setCustomValidity(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? '' : 'Vui lòng nhập email hợp lệ.');
    pw.setCustomValidity(pw.value.length >= 6 ? '' : 'Mật khẩu cần tối thiểu 6 ký tự.');
    if (!f.reportValidity()) return;
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen">
      <main className="w-full min-h-screen flex items-center justify-center p-gutter-sm sm:p-gutter">
        <div className="flex flex-col w-full max-w-7xl mx-auto py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between p-gutter bg-surface-container-low rounded-xl relative overflow-hidden shadow-sm">
              <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-primary/5 pointer-events-none blur-3xl"></div>
              <div className="relative z-10 flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary-container text-on-primary font-headline-lg text-headline-lg shadow-sm">
                      {' '}
                      漢{' '}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-title-sm text-title-sm text-on-surface font-bold tracking-tight">
                        HanziSRS • 汉字通
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                        Hệ Thống Trí Nhớ Hàn Lâm
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm shadow-sm">
                    {' '}
                    Khổng Tử Đạo Học{' '}
                  </span>
                </div>
                <div className="pt-space-md">
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm mb-2">
                    {' '}
                    Luận Ngữ • Luận Học{' '}
                  </div>
                  <blockquote className="font-headline-xl text-headline-xl text-primary font-serif tracking-tight">
                    {' '}
                    “温故而知新”{' '}
                  </blockquote>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1 italic">
                    {' '}
                    "Ôn việc cũ mà biết thêm điều mới, lấy đó làm bậc thầy vậy."{' '}
                  </p>
                </div>
              </div>
              <div className="relative z-10 my-space-lg">
                <div className="bg-surface-container-lowest p-gutter rounded-xl shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 via-transparent to-transparent pointer-events-none"></div>
                  <div className="flex items-center justify-between mb-space-sm">
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                      {' '}
                      Giai đoạn: Master (Ghi nhớ sâu){' '}
                    </span>
                    <span className="material-symbols-outlined text-secondary text-sm">auto_stories</span>
                  </div>
                  <div className="flex flex-col items-center text-center py-space-sm">
                    <span className="font-display-character text-display-character text-on-surface select-none tracking-normal font-serif">
                      {' '}
                      老师{' '}
                    </span>
                    <div className="flex items-center gap-space-sm mt-space-xs">
                      <span className="font-title-sm text-title-sm text-primary font-medium tracking-wide">lǎoshī</span>
                      <button
                        aria-label="Phát âm"
                        className="p-1 rounded-full hover:bg-surface-container-high transition-colors text-primary flex items-center justify-center"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-lg">volume_up</span>
                      </button>
                    </div>
                    <p className="font-headline-md text-headline-md text-on-surface mt-1 font-semibold">
                      {' '}
                      Thầy giáo • Giáo viên{' '}
                    </p>
                  </div>
                  <div className="bg-surface-container p-space-sm rounded-lg mt-space-sm flex flex-col gap-1">
                    <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                      <span>Phương pháp Chiết Tự &amp; Mnemonic</span>
                      <span className="font-bold text-primary">Bộ Lão (老) + Bộ Cân (巾)</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {' '}
                      Người cao tuổi học rộng (老), cầm khăn cờ dẫn dắt môn đệ thành tài qua từng chặng đường tri
                      thức.{' '}
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative z-10 grid grid-cols-2 gap-space-sm pt-space-xs">
                <div className="p-space-sm bg-surface-container-lowest rounded-lg shadow-sm">
                  <div className="flex items-center gap-1.5 text-primary mb-1">
                    <span className="material-symbols-outlined text-base">psychology</span>
                    <span className="font-label-md text-label-md font-bold">Active Recall 6D</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {' '}
                    Truy hồi 6 chiều: Nghĩa, Pinyin, Thanh điệu, Bộ thủ, Bút thuận, Cụm ngữ cảnh.{' '}
                  </p>
                </div>
                <div className="p-space-sm bg-surface-container-lowest rounded-lg shadow-sm">
                  <div className="flex items-center gap-1.5 text-secondary mb-1">
                    <span className="material-symbols-outlined text-base">schedule</span>
                    <span className="font-label-md text-label-md font-bold">SRS Thuật Toán</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {' '}
                    Phân bổ khoảng lặp khoa học, kích thích ký ức đúng ngưỡng lãng quên tự nhiên.{' '}
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center bg-surface-container-lowest p-gutter rounded-xl shadow-lg relative">
              <div className="flex items-center justify-between pb-space-md mb-space-md bg-surface-container-low p-1.5 rounded-lg">
                <button
                  id="tab-login"
                  type="button"
                  className={`flex-1 py-2 rounded-md font-title-sm text-title-sm text-center font-semibold transition-all ${reg ? 'text-on-surface-variant' : 'bg-surface-container-lowest text-on-surface shadow-sm'}`}
                  onClick={() => setReg(false)}
                >
                  {' '}
                  Đăng nhập{' '}
                </button>
                <button
                  id="tab-register"
                  type="button"
                  className={`flex-1 py-2 rounded-md font-title-sm text-title-sm text-center font-medium transition-all hover:text-on-surface ${reg ? 'bg-surface-container-lowest text-on-surface shadow-sm' : 'text-on-surface-variant'}`}
                  onClick={() => setReg(true)}
                >
                  {' '}
                  Đăng ký tài khoản{' '}
                </button>
              </div>
              <form className="flex flex-col gap-space-md" id="auth-form" onSubmit={submit} noValidate>
                <div className="flex flex-col gap-1.5">
                  <label
                    className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between"
                    htmlFor="email"
                  >
                    <span>Thư điện tử (Email)</span>
                    <span className="text-on-surface-variant font-normal font-label-sm text-label-sm">
                      Được dùng để khôi phục SRS
                    </span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-3 text-on-surface-variant text-xl pointer-events-none">
                      mail
                    </span>{' '}
                    <input
                      className="w-full bg-surface-container-lowest text-on-surface rounded-xl pl-10 pr-4 py-3 font-body-md text-body-md shadow-sm outline-none focus:bg-surface-container-lowest"
                      id="email"
                      placeholder="hocgia@hanzisrs.edu.vn"
                      required
                      type="email"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="password">
                      Mật khẩu
                    </label>
                    <a className="font-label-md text-label-md text-primary hover:underline" href="javascript:void(0)">
                      Quên mật khẩu?
                    </a>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-3 text-on-surface-variant text-xl pointer-events-none">
                      lock
                    </span>{' '}
                    <input
                      className="w-full bg-surface-container-lowest text-on-surface rounded-xl pl-10 pr-11 py-3 font-body-md text-body-md shadow-sm outline-none"
                      id="password"
                      placeholder="••••••••••••"
                      required
                      type={showPw ? 'text' : 'password'}
                    />{' '}
                    <button
                      aria-label="Ẩn hoặc hiện mật khẩu"
                      className="absolute right-3 top-3 text-on-surface-variant hover:text-on-surface transition-colors"
                      id="toggle-password"
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                    >
                      <span className="material-symbols-outlined text-xl" id="eye-icon">
                        {showPw ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>
                <div
                  id="registration-extras"
                  className={`flex flex-col gap-space-md transition-all duration-300 ${reg ? '' : 'hidden'}`}
                >
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between">
                      <span>Trình độ khởi điểm</span>
                      <span className="text-on-surface-variant font-label-sm text-label-sm">
                        Định tuyến thẻ gợi ý ban đầu
                      </span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <label className="cursor-pointer">
                        <input
                          defaultChecked
                          className="peer sr-only"
                          name="hsk_tier"
                          type="radio"
                          defaultValue="hsk1"
                        />
                        <div className="p-2.5 rounded-lg text-center bg-surface-container-low peer-checked:bg-primary-container peer-checked:text-on-primary transition-all">
                          <div className="font-title-sm text-title-sm font-bold">HSK 1</div>
                          <div className="font-label-sm text-label-sm opacity-80">Sơ cấp (150 từ)</div>
                        </div>
                      </label>
                      <label className="cursor-pointer">
                        <input className="peer sr-only" name="hsk_tier" type="radio" defaultValue="hsk2" />
                        <div className="p-2.5 rounded-lg text-center bg-surface-container-low peer-checked:bg-primary-container peer-checked:text-on-primary transition-all">
                          <div className="font-title-sm text-title-sm font-bold">HSK 2</div>
                          <div className="font-label-sm text-label-sm opacity-80">Căn bản (300 từ)</div>
                        </div>
                      </label>
                      <label className="cursor-pointer">
                        <input className="peer sr-only" name="hsk_tier" type="radio" defaultValue="hsk3" />
                        <div className="p-2.5 rounded-lg text-center bg-surface-container-low peer-checked:bg-primary-container peer-checked:text-on-primary transition-all">
                          <div className="font-title-sm text-title-sm font-bold">HSK 3</div>
                          <div className="font-label-sm text-label-sm opacity-80">Trung cấp (600 từ)</div>
                        </div>
                      </label>
                      <label className="cursor-pointer">
                        <input className="peer sr-only" name="hsk_tier" type="radio" defaultValue="hsk4_6" />
                        <div className="p-2.5 rounded-lg text-center bg-surface-container-low peer-checked:bg-primary-container peer-checked:text-on-primary transition-all">
                          <div className="font-title-sm text-title-sm font-bold">HSK 4–6</div>
                          <div className="font-label-sm text-label-sm opacity-80">Cao cấp (1200+)</div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface font-semibold flex items-center justify-between">
                      <span>Mục tiêu rèn luyện mỗi ngày</span>
                      <span className="text-tertiary font-label-sm text-label-sm font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">local_fire_department</span> Chuỗi kỷ
                        luật{' '}
                      </span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <label className="cursor-pointer">
                        <input className="peer sr-only" name="daily_goal" type="radio" defaultValue="10" />
                        <div className="p-2.5 rounded-lg text-center bg-surface-container-low peer-checked:bg-secondary peer-checked:text-on-secondary transition-all">
                          <div className="font-title-sm text-title-sm font-bold">10 từ</div>
                          <div className="font-label-sm text-label-sm opacity-80">~5 phút/ngày</div>
                        </div>
                      </label>
                      <label className="cursor-pointer">
                        <input
                          defaultChecked
                          className="peer sr-only"
                          name="daily_goal"
                          type="radio"
                          defaultValue="20"
                        />
                        <div className="p-2.5 rounded-lg text-center bg-surface-container-low peer-checked:bg-secondary peer-checked:text-on-secondary transition-all">
                          <div className="font-title-sm text-title-sm font-bold">20 từ</div>
                          <div className="font-label-sm text-label-sm opacity-80">Tiêu chuẩn vàng</div>
                        </div>
                      </label>
                      <label className="cursor-pointer">
                        <input className="peer sr-only" name="daily_goal" type="radio" defaultValue="30" />
                        <div className="p-2.5 rounded-lg text-center bg-surface-container-low peer-checked:bg-secondary peer-checked:text-on-secondary transition-all">
                          <div className="font-title-sm text-title-sm font-bold">30 từ</div>
                          <div className="font-label-sm text-label-sm opacity-80">Cường độ cao</div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  className="w-full py-3.5 px-6 rounded-lg bg-primary-container text-on-primary font-title-sm text-title-sm font-bold shadow-md hover:bg-primary transition-all flex items-center justify-center gap-2 mt-2"
                  id="submit-button"
                  type="submit"
                >
                  <span id="submit-text">{reg ? 'Bắt đầu hành trình tiếng Trung' : 'Tiến vào Giảng đường Hanzi'}</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow bg-surface-container-highest h-px"></div>
                  <span className="flex-shrink mx-4 text-on-surface-variant font-label-sm text-label-sm">
                    Hoặc tiếp tục tức thì
                  </span>
                  <div className="flex-grow bg-surface-container-highest h-px"></div>
                </div>
                <div className="grid grid-cols-2 gap-space-sm">
                  <button
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-surface-container-low text-on-surface font-title-sm text-title-sm hover:bg-surface-container-high transition-colors shadow-sm"
                    type="button"
                    onClick={() => navigate('/dashboard')}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span>Google</span>
                  </button>
                  <button
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-surface-container-low text-on-surface font-title-sm text-title-sm hover:bg-surface-container-high transition-colors shadow-sm"
                    type="button"
                    onClick={() => navigate('/dashboard')}
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-.98 1.71-.85 2.72 1 .08 2.02-.51 2.56-1.22z" />
                    </svg>
                    <span>Apple</span>
                  </button>
                </div>
                <div className="flex items-center justify-center gap-2 text-center text-on-surface-variant font-label-sm text-label-sm pt-2">
                  <span className="material-symbols-outlined text-base text-secondary">verified_user</span>
                  <span>Bảo mật chuẩn mã hóa SRS Cloud • Tuân thủ cam kết bảo mật &amp; quyền riêng tư</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
