import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Observable } from 'rxjs';
import { IEmployee } from 'src/app/_interfaces/employee/iemployee';
import { API_BASE } from 'src/environments/environment';
import { IEmployeeByCompany } from 'src/app/_interfaces/employee/iemployee-by-company';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  listEmployees: any[] = [];

  constructor(private http: HttpClient) {}

  saveEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.post<IEmployee>(`${API_BASE}/employee/`, employee);
  }

  async getByCompanyId(companyId: string | null) {
    if (companyId != null) {
      await this.getAll().then((res: IEmployee[]) => {
        this.listEmployees = res.filter((employee: IEmployee) => {
          return employee.companyId == companyId;
        });
      });
    }
    return this.listEmployees;
  }

  getAll(): Promise<any> {
    return firstValueFrom(this.http.get(`${API_BASE}/employee/list`));
  }

  getAllEmployeesByCompany(companyId: string | null): Observable<IEmployeeByCompany[]> {
    return this.http.get<IEmployeeByCompany[]>(`${API_BASE}/employee/employees-by-company?companyId=${companyId}`);
  }

  updateEmployeeById(id: string | undefined, payload: IEmployee) {
    const body = {
      name: payload.name,
      cpf: payload.cpf,
      farmId: payload.farmId,
      hiringDate: payload.hiringDate,
      telephoneNumber: payload.telephoneNumber,
      companyId: payload.company?.id,
      status: payload.status,
      job: payload.job,
    };

    console.log(body);
    return this.http.put(`${API_BASE}/employee/${id}`, body);
  }

  getTotalEmployeesCompanyLoggedIn(idCompany: any) {
    return this.http.get<any>(
      `${API_BASE}/employee/quantity-by-company?companyId=${idCompany}`
    );
  }

  updateEmployee(employee: any, id: any) {
    return this.http.put(`${API_BASE}/employee/${id}`, employee);
  }

  async getEmployeeFromCompany(id: string){
    let employee = null;

    await firstValueFrom(this.getAllEmployeesByCompany(localStorage.getItem('companyId'))).then(
      (res: any) => {
        employee = res.find((employee: any) => employee.id == id);
      }
    );

    return employee;
  }
}
