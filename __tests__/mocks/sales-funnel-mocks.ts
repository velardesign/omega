import { FunnelStage } from "@/src/domain/types/dashboard-types";

const mockDate = (daysAgo: number) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d;
};

export const salesFunnelMock: FunnelStage[] = [
  {
    label: "Medição / Visita",
    data: [
      { name: "Cliente A", price: 2000, date: mockDate(5) },
      { name: "Cliente B", price: 1500, date: mockDate(3) },
      { name: "Cliente C", price: 1800, date: mockDate(1) },
    ],
  },
  {
    label: "Orçamentos Enviados",
    data: [
      { name: "Cliente D", price: 3500, date: mockDate(7) },
      { name: "Cliente E", price: 4200, date: mockDate(2) },
    ],
  },
  {
    label: "Aguardando Retorno",
    data: [
      { name: "Cliente F", price: 5000, date: mockDate(4) },
      { name: "Cliente G", price: 2800, date: mockDate(1) },
    ],
  },
  {
    label: "Fechados",
    data: [
      { name: "Cliente H", price: 8000, date: mockDate(10) },
      { name: "Cliente I", price: 12000, date: mockDate(2) },
    ],
  },
];
