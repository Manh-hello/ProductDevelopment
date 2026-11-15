import bcrypt from "bcryptjs";
import type { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";
import { signToken } from "../utils/jwt";
import { ChangePasswordInput, LoginInput, RegisterInput, UpdateProfileInput } from "../validators/auth.validator";

const SALT_ROUNDS = 10;

// Field public an toàn để trả về client - KHÔNG BAO GIỜ trả passwordHash.
const PUBLIC_USER_SELECT = {
  id: true,
  email: true,
  displayName: true,
  avatarUrl: true,
  dailyGoal: true,
  currentStreak: true,
  longestStreak: true,
  totalXp: true,
  createdAt: true,
  settings: true,
} as const;

export async function registerUser(input: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) {
    throw new AppError("Email này đã được đăng ký.", 409);
  }

  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      displayName: input.name,
      email: input.email,
      passwordHash,
      ...(input.dailyGoal ? { dailyGoal: input.dailyGoal } : {}),
      ...(input.level ? { settings: { level: input.level } } : {}),
    },
    select: PUBLIC_USER_SELECT,
  });

  const token = signToken({ userId: user.id });
  return { user, token };
}

export async function loginUser(input: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) {
    throw new AppError("Email hoặc mật khẩu không đúng.", 401);
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.passwordHash);
  if (!isPasswordValid) {
    throw new AppError("Email hoặc mật khẩu không đúng.", 401);
  }

  const token = signToken({ userId: user.id });

  const { passwordHash: _passwordHash, ...publicUser } = user;
  return { user: publicUser, token };
}

export async function getCurrentUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: PUBLIC_USER_SELECT,
  });

  if (!user) {
    throw new AppError("Không tìm thấy người dùng.", 404);
  }

  return user;
}

export async function updateProfile(userId: string, input: UpdateProfileInput) {
  const current = await prisma.user.findUnique({ where: { id: userId }, select: { settings: true } });
  if (!current) throw new AppError("Không tìm thấy người dùng.", 404);

  const existingSettings = current.settings && typeof current.settings === "object" && !Array.isArray(current.settings)
    ? current.settings
    : {};
  const { settings, ...rest } = input;
  const mergedSettings = settings
    ? ({ ...existingSettings, ...settings } as Prisma.InputJsonObject)
    : undefined;

  return prisma.user.update({
    where: { id: userId },
    data: { ...rest, ...(mergedSettings ? { settings: mergedSettings } : {}) },
    select: PUBLIC_USER_SELECT,
  });
}

export async function changePassword(userId: string, input: ChangePasswordInput) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AppError("Không tìm thấy người dùng.", 404);
  if (!(await bcrypt.compare(input.currentPassword, user.passwordHash))) {
    throw new AppError("Mật khẩu hiện tại không đúng.", 400, { currentPassword: ["Mật khẩu hiện tại không đúng."] });
  }
  await prisma.user.update({ where: { id: userId }, data: { passwordHash: await bcrypt.hash(input.newPassword, SALT_ROUNDS) } });
}

export async function deleteAccount(userId: string, password: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AppError("Không tìm thấy người dùng.", 404);
  if (!(await bcrypt.compare(password, user.passwordHash))) throw new AppError("Mật khẩu không đúng.", 400);
  await prisma.user.delete({ where: { id: userId } }); // cascade xoá toàn bộ dữ liệu học
}

/** Xuất toàn bộ dữ liệu học của user (tính năng sao lưu). */
export async function exportUserData(userId: string) {
  const [user, vocabularies, sentences, sessions, achievements] = await Promise.all([
    getCurrentUser(userId),
    prisma.userVocabulary.findMany({ where: { userId }, include: { vocabulary: { include: { examples: true } } } }),
    prisma.userSentence.findMany({ where: { userId } }),
    prisma.studySession.findMany({ where: { userId } }),
    prisma.userAchievement.findMany({ where: { userId }, include: { achievement: true } }),
  ]);
  return { exportedAt: new Date().toISOString(), user, vocabularies, sentences, sessions, achievements };
}
