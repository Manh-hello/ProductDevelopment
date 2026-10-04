import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";
import { signToken } from "../utils/jwt";
import { LoginInput, RegisterInput } from "../validators/auth.validator";

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
