import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IEmployee } from 'src/app/_interfaces/employee/iemployee';
import { API_BASE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  listEmployees: any[] = [];

  constructor(private http: HttpClient) {}

  async getByCompanyId(companyId: number) {
    await this.getAll().then((res: IEmployee[]) => {
      this.listEmployees = res.filter((employee: IEmployee) => {
        return employee.company.id == companyId.toString();
      });
    });

    return this.listEmployees;
  }

  getAll(): Promise<any> {
    return firstValueFrom(this.http.get(`${API_BASE}/employee/list`));
  }

  updateEmployeeById(id: string | undefined, payload: IEmployee){
    const body = {
      name: payload.name,
      cpf: payload.cpf,
      farmId: payload.farmId,
      hiringDate: payload.hiringDate,
      telephoneNumber: payload.telephoneNumber,
      companyId: payload.company.id,
      status: payload.status,
      job: payload.job
    }
    return this.http.put(`${API_BASE}/employee/${id}`, body);
  }

  getTotalEmployeesCompanyLoggedIn(idCompany: any) {
    return this.http.get<any>(
      `${API_BASE}/employee/quantity-by-company?companyId=${idCompany}`
    );
  }
}
