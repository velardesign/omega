-- CreateTable
CREATE TABLE `Sequencia` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `proximo` INTEGER NOT NULL,

    UNIQUE INDEX `Sequencia_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
