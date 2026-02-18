/*
  Warnings:

  - Added the required column `estado` to the `endereco_fornecedor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `endereco_fornecedor` ADD COLUMN `estado` VARCHAR(191) NOT NULL;
