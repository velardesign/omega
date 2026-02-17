/*
  Warnings:

  - You are about to drop the `ItemVenda` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `endereco` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nome]` on the table `produto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoria_id` to the `produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cor` to the `produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fornecedor_id` to the `produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `material` to the `produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidade_medida` to the `produto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ItemVenda` DROP FOREIGN KEY `ItemVenda_produto_id_fkey`;

-- DropForeignKey
ALTER TABLE `ItemVenda` DROP FOREIGN KEY `ItemVenda_venda_id_fkey`;

-- DropForeignKey
ALTER TABLE `endereco` DROP FOREIGN KEY `endereco_clienteId_fkey`;

-- AlterTable
ALTER TABLE `contato` ADD COLUMN `fornecedorId` VARCHAR(191) NULL,
    MODIFY `clienteId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `produto` ADD COLUMN `categoria_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `cor` VARCHAR(191) NOT NULL,
    ADD COLUMN `fornecedor_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `material` VARCHAR(191) NOT NULL,
    ADD COLUMN `nome` VARCHAR(191) NOT NULL,
    ADD COLUMN `unidade_medida` VARCHAR(191) NOT NULL,
    MODIFY `preco_venda` DECIMAL(65, 30) NULL;

-- DropTable
DROP TABLE `ItemVenda`;

-- DropTable
DROP TABLE `endereco`;

-- CreateTable
CREATE TABLE `endereco_cliente` (
    `id` VARCHAR(191) NOT NULL,
    `logradouro` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `pais` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `clienteId` VARCHAR(191) NOT NULL,

    INDEX `endereco_clienteId_fkey`(`clienteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_venda` (
    `id` VARCHAR(191) NOT NULL,
    `quantidade` DECIMAL(10, 3) NOT NULL,
    `preco_venda` DECIMAL(65, 30) NOT NULL,
    `ambiente` VARCHAR(191) NULL,
    `observacao` VARCHAR(191) NULL,
    `venda_id` VARCHAR(191) NOT NULL,
    `produto_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `categoria_codigo_key`(`codigo`),
    UNIQUE INDEX `categoria_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fornecedor` (
    `id` VARCHAR(191) NOT NULL,
    `codigo` VARCHAR(191) NULL,
    `razao_social` VARCHAR(191) NOT NULL,
    `nome_fantasia` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `endereco_fornecedor` (
    `id` VARCHAR(191) NOT NULL,
    `logradouro` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `pais` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `fornecedorId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `endereco_fornecedor_fornecedorId_key`(`fornecedorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `produto_nome_key` ON `produto`(`nome`);

-- AddForeignKey
ALTER TABLE `endereco_cliente` ADD CONSTRAINT `endereco_cliente_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contato` ADD CONSTRAINT `contato_fornecedorId_fkey` FOREIGN KEY (`fornecedorId`) REFERENCES `fornecedor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_venda` ADD CONSTRAINT `item_venda_venda_id_fkey` FOREIGN KEY (`venda_id`) REFERENCES `venda`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_venda` ADD CONSTRAINT `item_venda_produto_id_fkey` FOREIGN KEY (`produto_id`) REFERENCES `produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produto` ADD CONSTRAINT `produto_categoria_id_fkey` FOREIGN KEY (`categoria_id`) REFERENCES `categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produto` ADD CONSTRAINT `produto_fornecedor_id_fkey` FOREIGN KEY (`fornecedor_id`) REFERENCES `fornecedor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `endereco_fornecedor` ADD CONSTRAINT `endereco_fornecedor_fornecedorId_fkey` FOREIGN KEY (`fornecedorId`) REFERENCES `fornecedor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
