import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  api: string = 'https://m2p2-devagro-squad02-backend.herokuapp.com/employee/list';
  listEmployees: any[] = [];

  constructor(private http: HttpClient) { }

  async getByCompanyId(companyId: number) {
    console.log(companyId);

    await this.getAll()
      .then(res => {
        this.listEmployees = res;

        res.filter((employee: any) => {
          employee.company.id === companyId
        })
      }
      )

    return this.listEmployees;
  }

  getAll(): Promise<any> {
    return firstValueFrom(this.http.get(this.api));
  }
}
