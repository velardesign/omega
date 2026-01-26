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
  Package,
  Settings,
  BarChart,
  Warehouse,
  FileChartPie,
} from "lucide-react";

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
    isActive: false,
    items: [
      {
        title: "Nova Proposta",
        url: "#",
      },
      {
        title: "Buscar Proposta",
        url: "#",
      },
      {
        title: "Relatórios",
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
        title: "Agendar",
        url: "#",
      },
      {
        title: "Serviços do Dia",
        url: "#",
      },
      {
        title: "Relatórios",
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
        title: "Clientes",
        url: "#",
      },
      {
        title: "Fornecedores",
        url: "#",
      },
      {
        title: "Colaboradores",
        url: "#",
      },
      {
        title: "Relatórios",
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
        url: "/dashboard/financeiro/caixa/abrir",
      },
      {
        title: "Receber",
        url: "/dashboard/financeiro/caixa/receber",
      },
      {
        title: "Fechar",
        url: "/dashboard/financeiro/caixa/fechar",
      },
      {
        title: "Relatórios ",
        url: "/dashboard/financeiro/caixa/relatorios",
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

export const navProduct = [
  {
    title: "Gestão de Produtos",
    url: "#",
    icon: Package,
    isActive: false,
    items: [
      {
        title: "Novo",
        url: "#",
      },
      {
        title: "Listar",
        url: "#",
      },
    ],
  },
  {
    title: "Configurações",
    url: "#",
    icon: Settings,
    items: [
      {
        title: "Categorias",
        url: "#",
      },
      {
        title: "Marcas",
        url: "#",
      },
      {
        title: "Unidades",
        url: "#",
      },
    ],
  },
];

export const navStock = [
  {
    title: "Movimentações",
    url: "#",
    icon: Warehouse,
    isActive: false,
    items: [
      {
        title: "Entrada",
        url: "#",
      },
      {
        title: "Saída",
        url: "#",
      },
      {
        title: "Transferência",
        url: "#",
      },
    ],
  },
  {
    title: "Consultas",
    url: "#",
    icon:FileChartPie ,
    items: [
      {
        title: "Posição Atual",
        url: "#",
      },
      {
        title: "Histórico",
        url: "#",
      },
      {
        title: "Produtos em Falta",
        url: "#",
      },
    ],
  },
  {
    title: "Controles",
    url: "#",
    icon: LineChart,
    items: [
      {
        title: "Inventário",
        url: "#",
      },
      {
        title: "Ajustes",
        url: "#",
      },
      {
        title: "Alertas",
        url: "#",
      },
    ],
  },
];

