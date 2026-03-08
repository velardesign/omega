# next-prisma

Aplicação web full-stack construída com **Next.js**, **Prisma ORM** e **PostgreSQL**, com autenticação via **Better Auth**, componentes acessíveis com **Radix UI** e estilização com **Tailwind CSS v4**.

---

## 📦 Stack Principal

| Camada | Tecnologia | Versão |
|---|---|---|
| Framework | [Next.js](https://nextjs.org/docs) | ^16 |
| ORM | [Prisma](https://www.prisma.io/docs) | ^7 |
| Adapter DB | [@prisma/adapter-pg](https://www.prisma.io/docs/orm/overview/databases/postgresql) | ^7 |
| Autenticação | [Better Auth](https://www.better-auth.com/docs) | ^1.4 |
| UI Components | [shadcn/ui](https://ui.shadcn.com/docs) | — |
| Primitivos | [Radix UI](https://www.radix-ui.com/primitives/docs/overview/introduction) | vários |
| Estilização | [Tailwind CSS](https://tailwindcss.com/docs) | ^4 |
| Formulários | [React Hook Form](https://react-hook-form.com/get-started) | ^7 |
| Validação | [Zod](https://zod.dev) | ^4 |
| Tabelas | [TanStack Table](https://tanstack.com/table/latest/docs/introduction) | ^8 |
| Ícones | [Lucide React](https://lucide.dev/guide/packages/lucide-react) | ^0.562 |
| Notificações | [Sonner](https://sonner.emilkowal.ski) | ^2 |
| Temas | [next-themes](https://github.com/pacocoursey/next-themes) | ^0.4 |

---

## 🚀 Scripts

```bash
# Iniciar servidor de desenvolvimento
pnpm dev

# Build para produção (gera client Prisma + migra o banco + build Next.js)
pnpm build

# Iniciar em modo produção
pnpm start

# Lint
pnpm lint

# Testes unitários
pnpm test

# Testes com interface visual (Vitest UI)
pnpm test:ui

# Cobertura de testes
pnpm test:coverage
```

---

## ⚙️ Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Banco de dados (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

# Better Auth
BETTER_AUTH_SECRET="sua-chave-secreta"
BETTER_AUTH_URL="http://localhost:3000"
```

> Consulte a documentação do [Better Auth — Environment Variables](https://www.better-auth.com/docs/installation) e do [Prisma — Connection URLs](https://www.prisma.io/docs/orm/reference/connection-urls) para mais detalhes.

---

## 🗄️ Banco de Dados (Prisma)

### Comandos úteis

```bash
# Gerar o Prisma Client após alterar o schema
npx prisma generate

# Criar e aplicar uma nova migration
npx prisma migrate dev --name nome-da-migration

# Aplicar migrations em produção
npx prisma migrate deploy

# Abrir o Prisma Studio (GUI para o banco)
npx prisma studio

# Resetar o banco (⚠️ apaga todos os dados)
npx prisma migrate reset
```

> 📖 Referência: [Prisma Migrate](https://www.prisma.io/docs/orm/prisma-migrate/getting-started) · [Prisma Client](https://www.prisma.io/docs/orm/prisma-client)

---

## 🔐 Autenticação (Better Auth)

A autenticação é gerenciada pelo [Better Auth](https://www.better-auth.com/docs), integrado com o banco via Prisma Adapter.

> 📖 Referência: [Better Auth — Prisma Adapter](https://www.better-auth.com/docs/adapters/prisma) · [Better Auth — Next.js Integration](https://www.better-auth.com/docs/integrations/next-js)

---

## 🎨 Componentes UI (shadcn/ui)

Os componentes são fornecidos pelo [shadcn/ui](https://ui.shadcn.com/docs), que gera componentes diretamente no seu projeto — construídos sobre primitivos **Radix UI**, estilizados com **Tailwind CSS** e variantes gerenciadas pelo **CVA**.

### Adicionar componentes

```bash
# Adicionar um componente específico
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add form

# Ver todos os componentes disponíveis
npx shadcn@latest add
```

> Os componentes são copiados para `components/ui/` e podem ser editados livremente.

### Componentes disponíveis baseados nas dependências do projeto

| Componente shadcn | Documentação |
|---|---|
| Alert Dialog | [shadcn — Alert Dialog](https://ui.shadcn.com/docs/components/alert-dialog) |
| Avatar | [shadcn — Avatar](https://ui.shadcn.com/docs/components/avatar) |
| Checkbox | [shadcn — Checkbox](https://ui.shadcn.com/docs/components/checkbox) |
| Collapsible | [shadcn — Collapsible](https://ui.shadcn.com/docs/components/collapsible) |
| Dialog | [shadcn — Dialog](https://ui.shadcn.com/docs/components/dialog) |
| Dropdown Menu | [shadcn — Dropdown Menu](https://ui.shadcn.com/docs/components/dropdown-menu) |
| Label | [shadcn — Label](https://ui.shadcn.com/docs/components/label) |
| Scroll Area | [shadcn — Scroll Area](https://ui.shadcn.com/docs/components/scroll-area) |
| Select | [shadcn — Select](https://ui.shadcn.com/docs/components/select) |
| Separator | [shadcn — Separator](https://ui.shadcn.com/docs/components/separator) |
| Tooltip | [shadcn — Tooltip](https://ui.shadcn.com/docs/components/tooltip) |

> 📖 Referência: [shadcn/ui Docs](https://ui.shadcn.com/docs) · [CVA — Class Variance Authority](https://cva.style/docs) · [Tailwind Merge](https://github.com/dcastil/tailwind-merge)

---

## 📝 Formulários e Validação

Formulários são gerenciados com [React Hook Form](https://react-hook-form.com) e validados com [Zod](https://zod.dev) via `@hookform/resolvers`.

```ts
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const form = useForm({
  resolver: zodResolver(schema),
})
```

> 📖 Referência: [hookform/resolvers](https://github.com/react-hook-form/resolvers) · [Zod v4](https://zod.dev/v4)

---

## 🧪 Testes (Vitest)

Os testes utilizam [Vitest](https://vitest.dev/guide/) com [Testing Library](https://testing-library.com/docs/react-testing-library/intro/) e ambiente **jsdom**.

```bash
# Rodar todos os testes
pnpm test

# Interface visual interativa
pnpm test:ui

# Relatório de cobertura
pnpm test:coverage
```

> 📖 Referência: [Vitest](https://vitest.dev) · [Testing Library — React](https://testing-library.com/docs/react-testing-library/intro) · [jest-dom Matchers](https://github.com/testing-library/jest-dom)

---

## 📁 Estrutura sugerida do projeto

```
.
├── app/                  # App Router do Next.js
│   ├── (auth)/           # Rotas de autenticação
│   ├── api/              # API Routes
│   └── layout.tsx
├── components/           # Componentes reutilizáveis
│   └── ui/               # Primitivos UI (Radix + Tailwind)
├── lib/                  # Utilitários e configurações
│   ├── auth.ts           # Configuração do Better Auth
│   ├── db.ts             # Instância do Prisma Client
│   └── utils.ts          # Helpers gerais
├── prisma/
│   ├── schema.prisma     # Schema do banco de dados
│   └── migrations/       # Histórico de migrations
├── .env                  # Variáveis de ambiente (não versionar)
└── package.json
```

---

## 🔗 Links úteis

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Better Auth Docs](https://www.better-auth.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com/docs)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Tailwind CSS v4](https://tailwindcss.com/docs/v4-beta)
- [Vitest Docs](https://vitest.dev/guide/)
- [TanStack Table](https://tanstack.com/table/latest)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)
- [Sonner](https://sonner.emilkowal.ski)
- [Lucide Icons](https://lucide.dev)