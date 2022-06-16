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
  regexCnpj: RegExp = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/;
  regexPassword: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
  regexEmail: RegExp = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+\.*[a-z0-9-]+.\.[a-z]{2,3}$/;
  companyForm!: FormGroup;
  registerBtn: string = 'Cadastrar';
  alertMessage!: IAlert;
  registerSended: boolean = false;
  emailIsRegistered: boolean = false;
  newCompany: any;

  constructor(
    private companyService: CompanyService,
    private alertService: AlertService
  ) { }

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
      email: new FormControl(null, [Validators.required,
      Validators.pattern(this.regexEmail)]),
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
    this.newCompany = this.createNewCompany();
    this.registerCompanyIfEmailNotRegistered();
    
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

  private postCompany(newCompany: ICompany, reponse: any) {
    return new Promise((resolve, reject) => {
      if (reponse.sucess) {
        if (!this.emailIsRegistered) {
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
        } else {
            this.registerSended = false;
            this.alertMessage = {
              title: 'Ocorreu um erro ao cadastrar a empresa',
              message: 'E-mail já está cadastrado no sistema!!!',
              typeAlert: ERROR,
            };
          this.alertService.showGenericAlert(this.alertMessage);
        }
      }
    });
  }

  searchingEmailBD() {
    return new Promise((resolve, reject) => {
      try {
        this.companyService.getAllCompany().subscribe((data: any) => {
          const email = data.find((company: ICompany) => company.email == this.email.value);
          try {
            if (email.email != null && email.email != undefined) {
              this.emailIsRegistered = true;
            }
          } catch (error) {
            this.emailIsRegistered = false;
          }
          resolve({ sucess: true });
        });

      } catch (error) {
        reject({ sucess: false });
      }
    });
  }

  async registerCompanyIfEmailNotRegistered() {
    let searchingEmailBD = await this.searchingEmailBD();
    await this.postCompany(this.newCompany, searchingEmailBD);
  }
}