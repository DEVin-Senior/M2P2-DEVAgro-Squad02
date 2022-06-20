import { ICompany } from "../company/icompany"

export interface IEmployee {

  id?: string,
  company?: ICompany,
  name: string,
  cpf: string,
  farmId: any,
  telephoneNumber: string,
  companyId: any,
  status: boolean,
  job: string,
  hiringDate: string

}

export interface IEmployeeList{
  id?: string,
  name: string,
  farmId: any,
  companyId: any,
  status: boolean,
  job: string,
  hiringDate: string,
  farmName: string
}
