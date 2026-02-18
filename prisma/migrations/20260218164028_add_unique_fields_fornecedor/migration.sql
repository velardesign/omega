/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `fornecedor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[razao_social]` on the table `fornecedor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nome_fantasia]` on the table `fornecedor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `fornecedor_codigo_key` ON `fornecedor`(`codigo`);

-- CreateIndex
CREATE UNIQUE INDEX `fornecedor_razao_social_key` ON `fornecedor`(`razao_social`);

-- CreateIndex
CREATE UNIQUE INDEX `fornecedor_nome_fantasia_key` ON `fornecedor`(`nome_fantasia`);
