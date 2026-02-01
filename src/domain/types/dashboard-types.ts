export type TableFunelData = {
  name: string;
  price: number;
  date: Date;
};

export type FunnelStage = {
  label: string;
  data: TableFunelData[];
};