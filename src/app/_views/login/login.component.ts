import { UserServiceService } from '../../_services/user-service.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMsg: string = 'Usuário e/ou senha inválidos.';
  loginFormGroup!: FormGroup;
  loginSuccessful: boolean = false;

  constructor(private userService: UserServiceService, private route: Router) { }

  ngOnInit(): void {
    this.loginFormGroup = this.getFormConfiguration();
  }

  get email() {
    return this.loginFormGroup.get('email')!;
  }

  get password() {
    return this.loginFormGroup.get('password')!;
  }

  getFormConfiguration() {
    return new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }


  submit() {
    if (this.loginFormGroup.invalid) {
      return;
    }

    this.validateUserLogin();
  }

  validateUserLogin() {
    console.log(this.email.value);

    if (this.userService.verifyUser(this.email.value, this.password.value)) {
      this.route.navigate(['/']);
      localStorage.setItem('user', this.email.value);
      return true;
    }

    return false;
  }

}
