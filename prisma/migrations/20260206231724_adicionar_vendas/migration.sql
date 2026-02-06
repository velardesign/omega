/*
  Warnings:

  - Added the required column `pagamento_id` to the `entrada` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `entrada` ADD COLUMN `pagamento_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `venda` (
    `id` VARCHAR(191) NOT NULL,
    `data_hora` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `responsavel` VARCHAR(191) NOT NULL,
    `cliente_id` VARCHAR(191) NOT NULL,
    `pagamentoId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `venda_pagamentoId_key`(`pagamentoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produto` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `preco_venda` DECIMAL(65, 30) NOT NULL,
    `preco_compra` DECIMAL(65, 30) NOT NULL,
    `venda_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `produto_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pagamento` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `entrada` ADD CONSTRAINT `entrada_pagamento_id_fkey` FOREIGN KEY (`pagamento_id`) REFERENCES `pagamento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `venda` ADD CONSTRAINT `venda_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `cliente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `venda` ADD CONSTRAINT `venda_pagamentoId_fkey` FOREIGN KEY (`pagamentoId`) REFERENCES `pagamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produto` ADD CONSTRAINT `produto_venda_id_fkey` FOREIGN KEY (`venda_id`) REFERENCES `venda`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
