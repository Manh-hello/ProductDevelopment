-- AlterTable: mở rộng user_sentences để lưu câu do hệ thống sinh (AI / câu ví dụ có sẵn).
-- Các cột mới đều NULL hoặc có DEFAULT nên dữ liệu câu tự viết hiện có không bị ảnh hưởng (source = 'manual').
ALTER TABLE `user_sentences` ADD COLUMN `translation` VARCHAR(500) NULL,
    ADD COLUMN `explanation` TEXT NULL,
    ADD COLUMN `topic` VARCHAR(50) NULL,
    ADD COLUMN `level` VARCHAR(20) NULL,
    ADD COLUMN `source` VARCHAR(20) NOT NULL DEFAULT 'manual',
    ADD COLUMN `used_words` JSON NULL;
