import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAlert } from 'src/app/_interfaces/alert/ialert';
import { IEmployee } from 'src/app/_interfaces/employee/iemployee';
import { AlertService } from 'src/app/_shared/alert/alert.service';
import { FarmService } from 'src/app/_services/farm/farm.service';
import { ERROR, SUCCESS } from 'src/environments/environment';
import { CompanyService } from 'src/app/_services/company/company.service';
import { EmployeeService } from 'src/app/_services/employee/employee.service';
import * as moment from 'moment';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  regexCpf: RegExp = /^(\d{3})(\d{3})(\d{3})(\d{2})/;
  regexTel: RegExp = /^(\d{2})(\d{5})(\d{4})/;
  //companyId = localStorage.getItem('companyId');
  employeeForm!: FormGroup;
  btnName:string = 'CADASTRAR';
  menuName: string = 'Funcionário';
  formSended: boolean = false;
  requestFinished: boolean = false;
  alertMessage!: IAlert;
  getIdCompanyLoggedIn: string | null = localStorage.getItem('companyId');
  farmFromCompany: any = [];
  farms: any;


  constructor(
    private employeeService: EmployeeService,
    private farmService: FarmService,
    private alertService: AlertService,
    private companyService: CompanyService,

  ) { }

  ngOnInit(): void {
    this.employeeForm = this.getFormConfiguration();
    this.getAllFarmsByCompany();

  }


  getFormConfiguration() {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      cpf: new FormControl('',
               [Validators.required,
               Validators.pattern(this.regexCpf)
               ]),
      farmId: new FormControl('', [Validators.required]),
      telephoneNumber: new FormControl('',
               [Validators.required,
                Validators.pattern(this.regexTel)
              ]),
      companyId: new FormControl(this.getIdCompanyLoggedIn, []),
      status: new FormControl(true, []),
      job: new FormControl('', [Validators.required]),
      hiringDate: new FormControl(moment().locale('pt-br').format('YYYY-MM-DD'), [])

    });
  }

  getAllFarmsByCompany() {
    this.farmService.getAllfarm().subscribe((data) => {
      this.farmFromCompany = data;
    });
  }

  getFarmsByCompanyId() {
    return new Promise((resolve, reject) => {
      try {
        this.farmService
          .getAllfarmCompanyLoggedIn(this.companyId)
          .subscribe((data: any) => {
            this.farms = data;
            resolve({ sucess: true });
          });
      } catch (error) {
        reject({ sucess: false });
      }
    });
  }


  get name() {
    return this.employeeForm.get('name')!;
  }
  get cpf() {
    return this.employeeForm.get('cpf')!;
  }
  get farmId() {
    return this.employeeForm.get('farmId')!;
  }
  get telephoneNumber() {
    return this.employeeForm.get('telephoneNumber')!;
  }
  get companyId() {
    return this.employeeForm.get('companyId')!;
  }
  get status() {
    return this.employeeForm.get('status')!;
  }
  get job() {
    return this.employeeForm.get('job')!;
  }
  get hiringDate() {
    return this.employeeForm.get('hiringDate')!;
  }

  createNewEmployee(): IEmployee {
    return {
      name: this.name.value,
      cpf: this.cpf.value.replace(this.regexCpf, "$1.$2.$3-$4"),
      farmId: this.farmId.value,
      telephoneNumber: this.telephoneNumber.value.replace(this.regexTel, "($1)$2$3"),
      companyId: this.companyId.value,
      status: this.status.value,
      job: this.job.value,
      hiringDate: this.hiringDate.value

    };
  }

  saveNewEmployee() {
    if (this.employeeForm.invalid) {
      this.formSended = false;
      return;
    }

    const newEmployee = this.createNewEmployee();

    this.postEmployee(newEmployee);
  }

  private postEmployee(newEmployee: IEmployee) {
    // newEmployee.companyId = getIdCompanyLoggedIn()
    this.employeeService
      .saveEmployee(newEmployee)
      .subscribe({
        complete: () => {
          this.formSended = true;
          this.alertMessage = {
            title: '',
            message: 'Funcionário cadastrado com sucesso!',
            typeAlert: SUCCESS,
          };
          this.employeeForm.reset();
        },
        error: (error) => {
          this.formSended = false;
          this.alertMessage = {
            title: 'Ocorreu um erro ao cadastrar o funcionário',
            message:
              error.error.message != null
                ? error.error.message
                : 'Entre em contato com o administrador do sistema.',
            typeAlert: ERROR,
          };
        },
      })
      .add(() => {
        this.requestFinished = true;
        this.alertService.showGenericAlert(this.alertMessage = {
          title: '',
            message: 'Funcionário cadastrado com sucesso!',
            typeAlert: SUCCESS,
        });

      });
  }


}

