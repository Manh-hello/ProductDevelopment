-- AlterTable
ALTER TABLE `vocabularies` ADD COLUMN `antonyms` JSON NULL,
    ADD COLUMN `collocations` JSON NULL,
    ADD COLUMN `enriched_at` DATETIME(3) NULL,
    ADD COLUMN `enriched_by` VARCHAR(80) NULL,
    ADD COLUMN `han_viet` VARCHAR(100) NULL,
    ADD COLUMN `measure_word` VARCHAR(100) NULL,
    ADD COLUMN `synonyms` JSON NULL,
    ADD COLUMN `traditional` VARCHAR(50) NULL,
    ADD COLUMN `usage` TEXT NULL;

-- AlterTable
ALTER TABLE `vocabulary_examples` ADD COLUMN `explanation` TEXT NULL,
    ADD COLUMN `source` VARCHAR(20) NOT NULL DEFAULT 'manual';

-- CreateIndex
CREATE INDEX `vocabularies_enriched_at_idx` ON `vocabularies`(`enriched_at`);
