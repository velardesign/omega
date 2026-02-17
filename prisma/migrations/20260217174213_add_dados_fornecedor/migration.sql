-- AlterTable
ALTER TABLE `fornecedor` ADD COLUMN `observacoes` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `dados_comercial_fornecedor` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NULL,
    `prazo_pagamento` INTEGER NULL,
    `forma_pagamento` VARCHAR(191) NULL,
    `banco` VARCHAR(191) NULL,
    `chave_pix` VARCHAR(191) NULL,
    `fornecedorId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `dados_comercial_fornecedor_fornecedorId_key`(`fornecedorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dados_comercial_fornecedor` ADD CONSTRAINT `dados_comercial_fornecedor_fornecedorId_fkey` FOREIGN KEY (`fornecedorId`) REFERENCES `fornecedor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
