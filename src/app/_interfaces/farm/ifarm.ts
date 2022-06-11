export interface IFarm {
  id?: string;
  name: string;
  address?: string;
  companyId: string;
  grainId: string;
  lastHarvest: string;
  stock?: number;
} //? não obrigatório.
