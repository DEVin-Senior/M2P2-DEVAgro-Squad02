export interface IFarm {
  id?: string;
  name: string;
  address?: string;
  companyId: string;
  grainId: string;
  lastHarvest: string;
  stock?: number;
  harvested?: boolean;
} //? não obrigatório.

export interface IFarmPut {
  id?: any;
  name: string;
  address?: string;
  company: {
    id: string,
  },
  grainId: string;
  lastHarvest: string;
  stock?: number;
  harvested?: boolean;
} //? não obrigatório.
