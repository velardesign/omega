-- CreateEnum
CREATE TYPE "TipoEntrada" AS ENUM ('CARTAO', 'DINHEIRO', 'PIX', 'TRANSFERENCIA');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "cod" TEXT NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documento" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "validade" TIMESTAMP(3),
    "clienteId" TEXT NOT NULL,

    CONSTRAINT "documento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "endereco_cliente" (
    "id" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,

    CONSTRAINT "endereco_cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contato_cliente" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "clienteId" TEXT,

    CONSTRAINT "contato_cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "caixa" (
    "id" TEXT NOT NULL,

    CONSTRAINT "caixa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entrada" (
    "id" TEXT NOT NULL,
    "tipo" "TipoEntrada" NOT NULL,
    "responsavel" TEXT NOT NULL,
    "data_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor" DECIMAL(10,2) NOT NULL,
    "caixa_id" TEXT NOT NULL,
    "pagamento_id" TEXT,

    CONSTRAINT "entrada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saida" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "data_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor" DECIMAL(10,2) NOT NULL,
    "caixa_id" TEXT NOT NULL,

    CONSTRAINT "saida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "abertura" (
    "id" TEXT NOT NULL,
    "data_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responsavel" TEXT NOT NULL,
    "autorizacao" TEXT NOT NULL,
    "caixa_id" TEXT NOT NULL,

    CONSTRAINT "abertura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fechamento" (
    "id" TEXT NOT NULL,
    "data_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responsavel" TEXT NOT NULL,
    "autorizacao" TEXT NOT NULL,
    "caixa_id" TEXT NOT NULL,

    CONSTRAINT "fechamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venda" (
    "id" TEXT NOT NULL,
    "data_hora" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responsavel" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,
    "pagamentoId" TEXT NOT NULL,

    CONSTRAINT "venda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_venda" (
    "id" TEXT NOT NULL,
    "quantidade" DECIMAL(10,3) NOT NULL,
    "preco_venda" DECIMAL(65,30) NOT NULL,
    "ambiente" TEXT,
    "observacao" TEXT,
    "venda_id" TEXT NOT NULL,
    "produto_id" TEXT NOT NULL,

    CONSTRAINT "item_venda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produto" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco_venda" DECIMAL(65,30),
    "preco_compra" DECIMAL(65,30) NOT NULL,
    "categoria_id" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "fornecedor_id" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "unidade_medida" TEXT NOT NULL,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagamento" (
    "id" TEXT NOT NULL,

    CONSTRAINT "pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fornecedor" (
    "id" TEXT NOT NULL,
    "codigo" TEXT,
    "razao_social" TEXT NOT NULL,
    "nome_fantasia" TEXT,
    "observacoes" TEXT,

    CONSTRAINT "fornecedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "endereco_fornecedor" (
    "id" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "fornecedorId" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "complemento" TEXT,

    CONSTRAINT "endereco_fornecedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dados_comercial_fornecedor" (
    "id" TEXT NOT NULL,
    "codigo" TEXT,
    "prazo_pagamento" INTEGER,
    "forma_pagamento" TEXT,
    "banco" TEXT,
    "chave_pix" TEXT,
    "fornecedorId" TEXT NOT NULL,

    CONSTRAINT "dados_comercial_fornecedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contato_fornecedor" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "fornecedorId" TEXT,

    CONSTRAINT "contato_fornecedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sequencia" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "proximo" INTEGER NOT NULL,

    CONSTRAINT "sequencia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "cliente_cod_key" ON "cliente"("cod");

-- CreateIndex
CREATE UNIQUE INDEX "abertura_caixa_id_key" ON "abertura"("caixa_id");

-- CreateIndex
CREATE UNIQUE INDEX "fechamento_caixa_id_key" ON "fechamento"("caixa_id");

-- CreateIndex
CREATE UNIQUE INDEX "venda_pagamentoId_key" ON "venda"("pagamentoId");

-- CreateIndex
CREATE UNIQUE INDEX "produto_codigo_key" ON "produto"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "produto_nome_key" ON "produto"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "categoria_codigo_key" ON "categoria"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "categoria_nome_key" ON "categoria"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "fornecedor_codigo_key" ON "fornecedor"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "fornecedor_razao_social_key" ON "fornecedor"("razao_social");

-- CreateIndex
CREATE UNIQUE INDEX "fornecedor_nome_fantasia_key" ON "fornecedor"("nome_fantasia");

-- CreateIndex
CREATE UNIQUE INDEX "endereco_fornecedor_fornecedorId_key" ON "endereco_fornecedor"("fornecedorId");

-- CreateIndex
CREATE UNIQUE INDEX "dados_comercial_fornecedor_fornecedorId_key" ON "dados_comercial_fornecedor"("fornecedorId");

-- CreateIndex
CREATE UNIQUE INDEX "sequencia_nome_key" ON "sequencia"("nome");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documento" ADD CONSTRAINT "documento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endereco_cliente" ADD CONSTRAINT "endereco_cliente_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contato_cliente" ADD CONSTRAINT "contato_cliente_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrada" ADD CONSTRAINT "entrada_caixa_id_fkey" FOREIGN KEY ("caixa_id") REFERENCES "caixa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrada" ADD CONSTRAINT "entrada_pagamento_id_fkey" FOREIGN KEY ("pagamento_id") REFERENCES "pagamento"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saida" ADD CONSTRAINT "saida_caixa_id_fkey" FOREIGN KEY ("caixa_id") REFERENCES "caixa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "abertura" ADD CONSTRAINT "abertura_caixa_id_fkey" FOREIGN KEY ("caixa_id") REFERENCES "caixa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fechamento" ADD CONSTRAINT "fechamento_caixa_id_fkey" FOREIGN KEY ("caixa_id") REFERENCES "caixa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venda" ADD CONSTRAINT "venda_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venda" ADD CONSTRAINT "venda_pagamentoId_fkey" FOREIGN KEY ("pagamentoId") REFERENCES "pagamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_venda" ADD CONSTRAINT "item_venda_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_venda" ADD CONSTRAINT "item_venda_venda_id_fkey" FOREIGN KEY ("venda_id") REFERENCES "venda"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto" ADD CONSTRAINT "produto_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produto" ADD CONSTRAINT "produto_fornecedor_id_fkey" FOREIGN KEY ("fornecedor_id") REFERENCES "fornecedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endereco_fornecedor" ADD CONSTRAINT "endereco_fornecedor_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "fornecedor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dados_comercial_fornecedor" ADD CONSTRAINT "dados_comercial_fornecedor_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "fornecedor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contato_fornecedor" ADD CONSTRAINT "contato_fornecedor_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "fornecedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
