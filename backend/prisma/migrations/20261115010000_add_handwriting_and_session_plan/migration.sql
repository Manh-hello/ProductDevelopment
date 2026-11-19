-- AlterTable
ALTER TABLE `study_sessions` ADD COLUMN `plan` JSON NULL;

-- CreateTable
CREATE TABLE `handwriting_attempts` (
    `id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `vocabulary_id` CHAR(36) NULL,
    `status` VARCHAR(20) NOT NULL,
    `predicted_char` VARCHAR(8) NULL,
    `confidence` DOUBLE NULL,
    `matches_target` BOOLEAN NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `handwriting_attempts_user_id_created_at_idx`(`user_id`, `created_at`),
    INDEX `handwriting_attempts_vocabulary_id_idx`(`vocabulary_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `handwriting_attempts` ADD CONSTRAINT `handwriting_attempts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `handwriting_attempts` ADD CONSTRAINT `handwriting_attempts_vocabulary_id_fkey` FOREIGN KEY (`vocabulary_id`) REFERENCES `vocabularies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
