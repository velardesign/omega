/*
  Warnings:

  - You are about to drop the `contato` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `contato` DROP FOREIGN KEY `contato_clienteId_fkey`;

-- DropTable
DROP TABLE `contato`;

-- CreateTable
CREATE TABLE `contato_cliente` (
    `id` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `valor` VARCHAR(191) NOT NULL,
    `clienteId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `contato_cliente` ADD CONSTRAINT `contato_cliente_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
