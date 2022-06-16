import { ICompany } from "../company/icompany";

export interface IEmployee {
  id?: string;
  name: string;
  farmId: string;
  cpf: string;
  telephoneNumber: string;
  hiringDate: string;
  company: ICompany;
  job: string;
  status: boolean;
}
