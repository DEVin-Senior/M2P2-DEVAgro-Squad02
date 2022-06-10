import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  api: string = 'https://m2p2-devagro-squad02-backend.herokuapp.com/employee/list';

  constructor(private http: HttpClient) { }

  async getByCompany(companyEmail: string) {
    let listEmployees: any[] = [];

    await this.getAll()
      .then(res =>
        listEmployees = res.filter((employee: any) => employee.email === companyEmail)
      )

    return listEmployees;
  }

  getAll(): Promise<any> {
    return firstValueFrom(this.http.get(this.api));
  }
}
