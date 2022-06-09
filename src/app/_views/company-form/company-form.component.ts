import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidations } from 'src/app/_shared/form-validations/form-validations';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css'],
})
export class CompanyFormComponent implements OnInit {
  company: any = {
    name: '',
    cnpj: '',
    address: '',
    email: '',
    password: '',
  };
  regexCnpj: RegExp = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/;
  regexPassword: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
  companyForm!: FormGroup;
  registerBtn: string = 'Cadastrar';
  registerSended: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.companyForm = this.getFormConfiguration();
  }

  get name() {
    return this.companyForm.get('name')!;
  }

  get cnpj() {
    return this.companyForm.get('cnpj')!;
  }

  get address() {
    return this.companyForm.get('address')!;
  }

  get email() {
    return this.companyForm.get('email')!;
  }

  get password() {
    return this.companyForm.get('password')!;
  }

  get confirmPassword() {
    return this.companyForm.get('confirmPassword')!;
  }

  getFormConfiguration() {
    return new FormGroup({
      name: new FormControl(null, [Validators.required]),
      cnpj: new FormControl(null, [Validators.required, Validators.pattern(this.regexCnpj)]),
      address: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(this.regexPassword)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.pattern(this.regexPassword), FormValidations.matchPassword('password')]),
    });
  }

  submit() {
    if (this.companyForm.invalid) {
      this.registerSended = false;
      return;
    }
    console.log('Formulário enviado');
    this.companyForm.reset();
    this.registerSended = true;
  }
}
