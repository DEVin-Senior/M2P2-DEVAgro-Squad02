import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAlert } from 'src/app/_interfaces/alert/ialert';
import { ICompany } from 'src/app/_interfaces/company/icompany';
import { CompanyService } from 'src/app/_services/company/company.service';
import { AlertService } from 'src/app/_shared/alert/alert.service';
import { FormValidations } from 'src/app/_shared/form-validations/form-validations';
import { ERROR, SUCCESS } from 'src/environments/environment';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.css'],
})
export class CompanyFormComponent implements OnInit {
  regexCnpj: RegExp = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/;
  regexPassword: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
  companyForm!: FormGroup;
  registerBtn: string = 'Cadastrar';
  alertMessage!: IAlert;
  registerSended: boolean = false;

  constructor(
    private companyService: CompanyService,
    private alertService: AlertService
  ) {}

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
      cnpj: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.regexCnpj),
      ]),
      address: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.regexPassword),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.regexPassword),
        FormValidations.matchPassword('password'),
      ]),
    });
  }

  submit() {
    if (this.companyForm.invalid) {
      this.registerSended = false;
      return;
    }

    const newCompany: ICompany = this.createNewCompany();
    this.postCompany(newCompany);
  }

  createNewCompany(): ICompany {
    return {
      name: this.name.value,
      cnpj: this.cnpj.value.replace(this.regexCnpj, "$1.$2.$3/$4-$5"),
      address: this.address.value,
      email: this.email.value,
      password: this.password.value,
    };
  }

  private postCompany(newCompany: ICompany) {
    this.companyService
      .saveCompany(newCompany)
      .subscribe({
        complete: () => {
          this.registerSended = true;
          this.alertMessage = {
            title: '',
            message: 'Empresa cadastrada com sucesso!',
            typeAlert: SUCCESS,
          };
          this.companyForm.reset();
        },
        error: (error) => {
          this.registerSended = false;
          this.alertMessage = {
            title: 'Ocorreu um erro ao cadastrar a empresa',
            message:
              error.error.message != null
                ? error.error.message
                : 'Entre em contato com o administrador do sistema.',
            typeAlert: ERROR,
          };
        },
      })
      .add(() => {
        this.alertService.showGenericAlert(this.alertMessage);
      });
  }
}
