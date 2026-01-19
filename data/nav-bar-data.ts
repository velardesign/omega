import {
  MessageSquare,
  Bot,
  Search,
  SquareTerminal,
  UserPlus,
  Users,
  FilePlusCorner,
  Wallet,
  CreditCard,
  LineChart,
  ShoppingCart,
  Briefcase,
  Contact,
} from "lucide-react";

export const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

export const modules = [
  {
    name: "Adicionar Cliente",
    logo: UserPlus,
    plan: "Novo Cliente",
    url: "/dashboard/clientes/adiciona",
  },
  {
    name: "Cadastro de Cliente",
    logo: Users,
    plan: "Gerenciar",
    url: "/dashboard/clientes/busca",
  },
  {
    name: "Adicionar Proposta",
    logo: FilePlusCorner,
    plan: "Consultar",
    url: "/dashboard/propostas/adiciona",
  },
  {
    name: "Buscar Proposta",
    logo: Search,
    plan: "Consultar",
    url: "/dashboard/propostas/busca",
  },
];

export const navCommercial = [
  {
    title: "Vendas",
    url: "#",
    icon: ShoppingCart,
    isActive: true,
    items: [
      {
        title: "History",
        url: "#",
      },
      {
        title: "Starred",
        url: "#",
      },
      {
        title: "Settings",
        url: "#",
      },
    ],
  },
  {
    title: "Serviços",
    url: "#",
    icon: Briefcase,
    items: [
      {
        title: "Genesis",
        url: "#",
      },
      {
        title: "Explorer",
        url: "#",
      },
      {
        title: "Quantum",
        url: "#",
      },
    ],
  },
  {
    title: "Contatos",
    url: "#",
    icon: Contact,
    items: [
      {
        title: "Introduction",
        url: "#",
      },
      {
        title: "Get Started",
        url: "#",
      },
      {
        title: "Tutorials",
        url: "#",
      },
      {
        title: "Changelog",
        url: "#",
      },
    ],
  },
];

export const navFinance = [
  {
    title: "Caixa",
    url: "#",
    icon: Wallet,
    isActive: false,
    items: [
      {
        title: "Abrir",
        url: "#",
      },
      {
        title: "Receber",
        url: "#",
      },
      {
        title: "Fechar",
        url: "#",
      },
      {
        title: "Relatórios ",
        url: "#",
      },
    ],
  },
  {
    title: "Pagamentos",
    url: "#",
    icon: CreditCard,
    items: [
      {
        title: "Fornecedores",
        url: "#",
      },
      {
        title: "Contas de Consulmo",
        url: "#",
      },
      {
        title: "Diversos",
        url: "#",
      },
    ],
  },
  {
    title: "Planejamento",
    url: "#",
    icon: LineChart,
    items: [
      {
        title: "Orçamentos",
        url: "#",
      },
      {
        title: "Metas Financeiras",
        url: "#",
      },
      {
        title: "Projeções",
        url: "#",
      },
      {
        title: "Histórico",
        url: "#",
      },
    ],
  },
];
