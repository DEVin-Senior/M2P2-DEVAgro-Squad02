import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICompany } from 'src/app/_interfaces/company/icompany';
import { API_BASE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getCompanyByIdFromCurrentUser() {
    return this.http.get(`${API_BASE}/company/list`);
  }
}
