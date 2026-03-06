/*
  Warnings:

  - Added the required column `codigo_fabricante` to the `produto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produto" ADD COLUMN     "codigo_fabricante" TEXT NOT NULL;
