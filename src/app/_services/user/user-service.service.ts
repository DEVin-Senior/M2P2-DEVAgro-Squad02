import { lastValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  // isCorrect!: Promise<boolean>;
  users!: any;
  api: string = 'https://m2p2-devagro-squad02-backend.herokuapp.com/company/list';
  constructor(private http: HttpClient) {
    this.getAll();
  }

  verifyUser(email: string, password: string): boolean {
    let isValid: boolean = false;

    this.users.some((user: any) => isValid = user.email === email && user.password === password);

    this.setCurrentCompanyIdFromUser(isValid, email);

   return isValid;

  }

  getAll(): void {
    this.http.get(this.api).subscribe((users) => this.users = users);
  }

  private setCurrentCompanyIdFromUser(isValid: boolean, currentUserEmail: string){
    if(!isValid || currentUserEmail == null || currentUserEmail == ''){
      return;
    }

    let companyId: string = "";
    companyId = this.users.find((user: any) => user.email == currentUserEmail).id;
    localStorage.setItem('companyId', companyId.toString());
  }

}
