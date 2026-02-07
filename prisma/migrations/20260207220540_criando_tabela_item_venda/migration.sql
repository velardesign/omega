/*
  Warnings:

  - You are about to drop the column `venda_id` on the `produto` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `produto` DROP FOREIGN KEY `produto_venda_id_fkey`;

-- DropIndex
DROP INDEX `produto_venda_id_fkey` ON `produto`;

-- AlterTable
ALTER TABLE `produto` DROP COLUMN `venda_id`;

-- CreateTable
CREATE TABLE `ItemVenda` (
    `id` VARCHAR(191) NOT NULL,
    `quantidade` DECIMAL(10, 3) NOT NULL,
    `preco_venda` DECIMAL(65, 30) NOT NULL,
    `venda_id` VARCHAR(191) NOT NULL,
    `produto_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ItemVenda` ADD CONSTRAINT `ItemVenda_venda_id_fkey` FOREIGN KEY (`venda_id`) REFERENCES `venda`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemVenda` ADD CONSTRAINT `ItemVenda_produto_id_fkey` FOREIGN KEY (`produto_id`) REFERENCES `produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
