import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IAlert } from 'src/app/_interfaces/alert/ialert';
import { IEmployee } from 'src/app/_interfaces/employee/iemployee';
import { IFarm } from 'src/app/_interfaces/farm/ifarm';
import { EmployeeService } from 'src/app/_services/employee/employee.service';
import { FarmService } from 'src/app/_services/farm/farm.service';
import { AlertService } from 'src/app/_shared/alert/alert.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css'],
})
export class EmployeeEditComponent implements OnInit {
  btnName: string = 'EDITAR';
  menuName: string = 'Editar Funcionários';
  employeeId!: string;
  employee: IEmployee = {
    id: '',
    name: '',
    farmId: '',
    cpf: '',
    telephoneNumber: '',
    hiringDate: '',
    companyId: {
      id: '',
      name: '',
      address: '',
      cnpj: '',
      email: '',
      password: '',
    },
    job: '',
    status: false,
  };
  allFarmsByCompanyFromEmployee: IFarm[] = [
    {
      id: '',
      name: '',
      companyId: '',
      grainId: '',
      lastHarvest: '',
    },
  ];

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private farmService: FarmService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.employeeId = this.actRoute.snapshot.params['id'];
    this.getEmployeeById();
  }

  getEmployeeById() {
   this.employeeService
      .getAll()
      .then((res: any) => {
        this.employee = res.find(
          (employee: IEmployee) => employee.id == this.employeeId
        );
        this.getAllFarmsByCompanyFromEmployee(this.employee.company?.id);
      })
      .catch((error) => {
        const alertMessage: IAlert = {
          title: 'Ocorreu um erro ao buscar os dados do funcionário',
          message: error.error
            ? error.error.message
            : 'Entre em contato com o administrador do sistema.',
        };
        this.alertService.showAlertError(alertMessage);
      });
  }

  getAllFarmsByCompanyFromEmployee(companyIdFromEmployee: string | undefined) {
    if (companyIdFromEmployee == null) {
      return;
    }
    this.farmService
      .getAllFarmsByCompany(companyIdFromEmployee)
      .subscribe((farms: any) => {
        this.allFarmsByCompanyFromEmployee = farms;
      });
  }

  checkEmployeeFarm() {
    if(this.allFarmsByCompanyFromEmployee.length == 0) {
      return;
    }

    const farm: IFarm | undefined = this.allFarmsByCompanyFromEmployee.find(
      (farm: IFarm) => this.employee.farmId == farm.id
    );

    if (farm == null || farm == undefined) {
      const alertMessage: IAlert = {
        title: '',
        message: 'Não foi possível localizar a fazenda atual do funcionário.',
      };
      this.alertService.showAlertWarning(alertMessage);
    }
  }

  updateEmployee() {
    this.employeeService
      .updateEmployeeById(this.employee.id, this.employee)
      .subscribe({
        next: (data: any) => {
          this.employee.id = data.id;
        },
        error: (error: any) => {
          const alertMessage: IAlert = {
            title: 'Ocorreu um erro ao tentar atualizar o funcionário',
            message: error.error
              ? error.error.message
              : 'Entre em contato com o administrador do sistema.',
          };
          this.alertService.showAlertError(alertMessage);
        },
        complete: () => {
          const alertMessage: IAlert = {
            title: 'Atualização',
            message: 'Funcionário Atualizado com Sucesso!',
          };
          this.alertService.showAlertSuccess(alertMessage);
          this.router.navigate(['/employee/list']);
        },
      });
  }
}
