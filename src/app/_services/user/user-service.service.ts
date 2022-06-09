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
    return this.users.some((user: any) =>
      user.email === email && user.password === password);
  }

  getAll(): void {
    this.http.get(this.api).subscribe((users) => this.users = users);
  }

}
