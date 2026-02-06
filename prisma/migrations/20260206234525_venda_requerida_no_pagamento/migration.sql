-- DropForeignKey
ALTER TABLE `entrada` DROP FOREIGN KEY `entrada_pagamento_id_fkey`;

-- DropIndex
DROP INDEX `entrada_pagamento_id_fkey` ON `entrada`;

-- AlterTable
ALTER TABLE `entrada` MODIFY `pagamento_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `entrada` ADD CONSTRAINT `entrada_pagamento_id_fkey` FOREIGN KEY (`pagamento_id`) REFERENCES `pagamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
