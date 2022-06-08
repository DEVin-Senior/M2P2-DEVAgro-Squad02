import { Component, OnInit } from '@angular/core';
import { UserServiceService } from './../_services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorMsg: string = 'Usuário e/ou senha inválidos.';

  constructor(private userService: UserServiceService, private route: Router) { }

  ngOnInit(): void {
  }

  verify() {
    if (this.userService.verifyUser(this.email, this.password)) {
      this.route.navigate(['/']);
      localStorage.setItem('user', this.email);
    } else {
      // printa error msg na tela
    }
  }

}
