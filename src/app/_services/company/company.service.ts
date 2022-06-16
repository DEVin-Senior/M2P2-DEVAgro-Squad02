import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICompany } from 'src/app/_interfaces/company/icompany';
import { API_BASE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) { }

  saveCompany(company: ICompany): Observable<ICompany> {
    return this.http.post<ICompany>(`${API_BASE}/company`, company);
  }

  getCompanyByIdFromCurrentUser() {
    return this.http.get(`${API_BASE}/company/list`);
  }

  getIdCompanyLoggedIn() {
    return localStorage.getItem('companyId')
  }

  getAllCompany(){
    return this.http.get(`${API_BASE}/company/list`);
  }
}
