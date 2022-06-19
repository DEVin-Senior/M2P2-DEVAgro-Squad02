export interface IGrainByCompany {
  id?: string;
  name: string;
  averageHarvestTime?: number;
  company: any;
  nextHarvestDate?: string;
  additionalInformation?: string;
}
