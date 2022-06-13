import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  users!: any;
  api: string = `${API_BASE}/company/list`;
  constructor(private http: HttpClient) {
  }

  async verifyUser(email: string, password: string): Promise<boolean> {
    let isValid: boolean = false;

    await this.getAll().then(res => this.users = res);

    this.users.some((user: any) => isValid = user.email === email && user.password === password);

    this.setCurrentCompanyIdFromUser(isValid, email);

    return isValid;
  }

  getAll(): Promise<any> {
    return firstValueFrom(this.http.get(this.api));
  }

  private setCurrentCompanyIdFromUser(isValid: boolean, currentUserEmail: string) {
    if (!isValid || currentUserEmail == null || currentUserEmail == '') {
      return;
    }

    let companyId: string = "";
    companyId = this.users.find((user: any) => user.email == currentUserEmail).id;
    localStorage.setItem('companyId', companyId.toString());
  }

}
