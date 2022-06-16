import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../../_services/user/user-service.service';
import { AlertService } from 'src/app/_shared/alert/alert.service';
import { IAlert } from 'src/app/_interfaces/alert/ialert';
import { ERROR } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMsg: string = 'Usuário e/ou senha inválidos.';
  loginFormGroup!: FormGroup;
  loginSuccessful: boolean = true;
  alertMessage!: IAlert;

  constructor(private userService: UserServiceService, private route: Router, private alertService: AlertService) { }

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

  async validateUserLogin() {
    let userIsCorrect: boolean = false;

    await this.userService.verifyUser(this.email.value, this.password.value).then(res => userIsCorrect = res);

    if (userIsCorrect) {
      this.route.navigate(['/home']);
      localStorage.setItem('user', this.email.value);
      this.loginSuccessful = true;
      return;
    }

    this.loginSuccessful = false;
  }

  forgotPassword() {
    this.alertService.showAlertWarning(this.alertMessage = {
      title: '',
      message: 'Favor entrar em contato com o administrador do sistema',
      typeAlert: ERROR,
    });
  }

}
