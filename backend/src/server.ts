import { createApp } from "./app";
import { env } from "./config/env";
import { prisma } from "./config/prisma";

const app = createApp();

async function main(): Promise<void> {
  // Kiểm tra kết nối database ngay khi start, fail sớm nếu DB không sẵn sàng
  // thay vì để lỗi xuất hiện muộn ở request đầu tiên.
  await prisma.$connect();
  console.log("✅ Kết nối PostgreSQL thành công.");

  app.listen(env.PORT, () => {
    console.log(`🚀 Backend đang chạy tại http://localhost:${env.PORT}`);
    console.log(`   Health check: http://localhost:${env.PORT}/api/health`);
  });
}

main().catch((err) => {
  console.error("❌ Không thể khởi động server:", err);
  process.exit(1);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
