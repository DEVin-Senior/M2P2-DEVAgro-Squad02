import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() user: any = {}
  loginFormGroup!: FormGroup;
  loginSuccessful: boolean = false;

  constructor() { }

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
    if (this.loginFormGroup.invalid || !this.validateUserLogin()) {
      this.loginSuccessful = false;
      return;
    }
    this.loginFormGroup.reset();
    this.loginSuccessful = true;
  }

  validateUserLogin(){
    if(this.email == this.user.email && this.password == this.user.password){
      return true;
    }
    return false;
  }

}
