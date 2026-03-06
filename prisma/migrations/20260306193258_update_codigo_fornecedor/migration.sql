/*
  Warnings:

  - Made the column `codigo` on table `fornecedor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "fornecedor" ALTER COLUMN "codigo" SET NOT NULL;
