-- CreateTable
CREATE TABLE `users` (
    `id` CHAR(36) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `display_name` VARCHAR(100) NOT NULL,
    `avatar_url` VARCHAR(500) NULL,
    `daily_goal` INTEGER NOT NULL DEFAULT 20,
    `current_streak` INTEGER NOT NULL DEFAULT 0,
    `longest_streak` INTEGER NOT NULL DEFAULT 0,
    `total_xp` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vocabularies` (
    `id` CHAR(36) NOT NULL,
    `hanzi` VARCHAR(50) NOT NULL,
    `pinyin` VARCHAR(200) NOT NULL,
    `meaning` VARCHAR(500) NOT NULL,
    `pronunciation` VARCHAR(200) NULL,
    `audio_url` VARCHAR(500) NULL,
    `level` VARCHAR(20) NULL,
    `part_of_speech` VARCHAR(50) NULL,
    `notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `vocabularies_hanzi_idx`(`hanzi`),
    INDEX `vocabularies_pinyin_idx`(`pinyin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vocabulary_examples` (
    `id` CHAR(36) NOT NULL,
    `vocabulary_id` CHAR(36) NOT NULL,
    `sentence_hanzi` VARCHAR(500) NOT NULL,
    `sentence_pinyin` VARCHAR(500) NOT NULL,
    `sentence_meaning` VARCHAR(500) NOT NULL,
    `audio_url` VARCHAR(500) NULL,

    INDEX `vocabulary_examples_vocabulary_id_idx`(`vocabulary_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `id` CHAR(36) NOT NULL,
    `name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `tags_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vocabulary_tags` (
    `vocabulary_id` CHAR(36) NOT NULL,
    `tag_id` CHAR(36) NOT NULL,

    INDEX `vocabulary_tags_tag_id_idx`(`tag_id`),
    PRIMARY KEY (`vocabulary_id`, `tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_vocabularies` (
    `id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `vocabulary_id` CHAR(36) NOT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'new',
    `mastery_level` INTEGER NOT NULL DEFAULT 0,
    `review_count` INTEGER NOT NULL DEFAULT 0,
    `correct_count` INTEGER NOT NULL DEFAULT 0,
    `incorrect_count` INTEGER NOT NULL DEFAULT 0,
    `learned_at` DATETIME(3) NULL,
    `last_reviewed_at` DATETIME(3) NULL,
    `next_review_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `user_vocabularies_user_id_idx`(`user_id`),
    INDEX `user_vocabularies_next_review_at_idx`(`next_review_at`),
    UNIQUE INDEX `user_vocabularies_user_id_vocabulary_id_key`(`user_id`, `vocabulary_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `srs_reviews` (
    `id` CHAR(36) NOT NULL,
    `user_vocabulary_id` CHAR(36) NOT NULL,
    `quality` INTEGER NOT NULL,
    `previous_interval` INTEGER NOT NULL,
    `new_interval` INTEGER NOT NULL,
    `previous_ease_factor` DOUBLE NOT NULL,
    `new_ease_factor` DOUBLE NOT NULL,
    `reviewed_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `next_review_at` DATETIME(3) NOT NULL,

    INDEX `srs_reviews_user_vocabulary_id_idx`(`user_vocabulary_id`),
    INDEX `srs_reviews_next_review_at_idx`(`next_review_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_sentences` (
    `id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `vocabulary_id` CHAR(36) NOT NULL,
    `sentence` TEXT NOT NULL,
    `pinyin` VARCHAR(500) NULL,
    `correction` TEXT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'pending',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `user_sentences_user_id_idx`(`user_id`),
    INDEX `user_sentences_vocabulary_id_idx`(`vocabulary_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exercises` (
    `id` CHAR(36) NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `description` VARCHAR(500) NULL,

    UNIQUE INDEX `exercises_type_key`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `study_sessions` (
    `id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `session_type` VARCHAR(20) NOT NULL,
    `total_questions` INTEGER NOT NULL DEFAULT 0,
    `correct_answers` INTEGER NOT NULL DEFAULT 0,
    `xp_earned` INTEGER NOT NULL DEFAULT 0,
    `started_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `completed_at` DATETIME(3) NULL,

    INDEX `study_sessions_user_id_started_at_idx`(`user_id`, `started_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exercise_attempts` (
    `id` CHAR(36) NOT NULL,
    `session_id` CHAR(36) NOT NULL,
    `exercise_id` CHAR(36) NOT NULL,
    `vocabulary_id` CHAR(36) NOT NULL,
    `user_answer` VARCHAR(500) NOT NULL,
    `is_correct` BOOLEAN NOT NULL,
    `response_time_ms` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `exercise_attempts_session_id_idx`(`session_id`),
    INDEX `exercise_attempts_vocabulary_id_idx`(`vocabulary_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `achievements` (
    `id` CHAR(36) NOT NULL,
    `code` VARCHAR(50) NOT NULL,
    `name` VARCHAR(200) NOT NULL,
    `description` VARCHAR(500) NULL,
    `icon` VARCHAR(100) NULL,
    `xp_reward` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `achievements_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_achievements` (
    `id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `achievement_id` CHAR(36) NOT NULL,
    `earned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `user_achievements_user_id_idx`(`user_id`),
    UNIQUE INDEX `user_achievements_user_id_achievement_id_key`(`user_id`, `achievement_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `daily_statistics` (
    `id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `statistic_date` DATE NOT NULL,
    `words_learned` INTEGER NOT NULL DEFAULT 0,
    `words_reviewed` INTEGER NOT NULL DEFAULT 0,
    `correct_answers` INTEGER NOT NULL DEFAULT 0,
    `incorrect_answers` INTEGER NOT NULL DEFAULT 0,
    `study_minutes` INTEGER NOT NULL DEFAULT 0,
    `xp_earned` INTEGER NOT NULL DEFAULT 0,

    INDEX `daily_statistics_user_id_statistic_date_idx`(`user_id`, `statistic_date`),
    UNIQUE INDEX `daily_statistics_user_id_statistic_date_key`(`user_id`, `statistic_date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `xp_transactions` (
    `id` CHAR(36) NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `amount` INTEGER NOT NULL,
    `source` VARCHAR(50) NOT NULL,
    `reference_id` CHAR(36) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `xp_transactions_user_id_created_at_idx`(`user_id`, `created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `vocabulary_examples` ADD CONSTRAINT `vocabulary_examples_vocabulary_id_fkey` FOREIGN KEY (`vocabulary_id`) REFERENCES `vocabularies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vocabulary_tags` ADD CONSTRAINT `vocabulary_tags_vocabulary_id_fkey` FOREIGN KEY (`vocabulary_id`) REFERENCES `vocabularies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `vocabulary_tags` ADD CONSTRAINT `vocabulary_tags_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_vocabularies` ADD CONSTRAINT `user_vocabularies_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_vocabularies` ADD CONSTRAINT `user_vocabularies_vocabulary_id_fkey` FOREIGN KEY (`vocabulary_id`) REFERENCES `vocabularies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `srs_reviews` ADD CONSTRAINT `srs_reviews_user_vocabulary_id_fkey` FOREIGN KEY (`user_vocabulary_id`) REFERENCES `user_vocabularies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_sentences` ADD CONSTRAINT `user_sentences_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_sentences` ADD CONSTRAINT `user_sentences_vocabulary_id_fkey` FOREIGN KEY (`vocabulary_id`) REFERENCES `vocabularies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `study_sessions` ADD CONSTRAINT `study_sessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exercise_attempts` ADD CONSTRAINT `exercise_attempts_session_id_fkey` FOREIGN KEY (`session_id`) REFERENCES `study_sessions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exercise_attempts` ADD CONSTRAINT `exercise_attempts_exercise_id_fkey` FOREIGN KEY (`exercise_id`) REFERENCES `exercises`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exercise_attempts` ADD CONSTRAINT `exercise_attempts_vocabulary_id_fkey` FOREIGN KEY (`vocabulary_id`) REFERENCES `vocabularies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_achievements` ADD CONSTRAINT `user_achievements_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_achievements` ADD CONSTRAINT `user_achievements_achievement_id_fkey` FOREIGN KEY (`achievement_id`) REFERENCES `achievements`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `daily_statistics` ADD CONSTRAINT `daily_statistics_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `xp_transactions` ADD CONSTRAINT `xp_transactions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
