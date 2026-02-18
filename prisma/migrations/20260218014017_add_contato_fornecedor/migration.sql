/*
  Warnings:

  - You are about to drop the column `fornecedorId` on the `contato` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `contato` DROP FOREIGN KEY `contato_fornecedorId_fkey`;

-- DropIndex
DROP INDEX `contato_fornecedorId_fkey` ON `contato`;

-- AlterTable
ALTER TABLE `contato` DROP COLUMN `fornecedorId`;

-- CreateTable
CREATE TABLE `contato_fornecedor` (
    `id` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `valor` VARCHAR(191) NOT NULL,
    `fornecedorId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `contato_fornecedor` ADD CONSTRAINT `contato_fornecedor_fornecedorId_fkey` FOREIGN KEY (`fornecedorId`) REFERENCES `fornecedor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
