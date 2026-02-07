/*
  Warnings:

  - A unique constraint covering the columns `[cod]` on the table `cliente` will be added. If there are existing duplicate values, this will fail.
  - Made the column `cod` on table `cliente` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `cliente` MODIFY `cod` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `cliente_cod_key` ON `cliente`(`cod`);
