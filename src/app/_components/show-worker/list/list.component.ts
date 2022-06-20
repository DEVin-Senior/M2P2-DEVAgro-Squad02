import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IAlert } from 'src/app/_interfaces/alert/ialert';
import { FarmService } from 'src/app/_services/farm/farm.service';
import { AlertService } from 'src/app/_shared/alert/alert.service';
import { EmployeeService } from 'src/app/_services/employee/employee.service';
import { IEmployeeList } from 'src/app/_interfaces/employee/iemployee';
import { IEmployeeByCompany } from 'src/app/_interfaces/employee/iemployee-by-company';
import { DateFormatService } from 'src/app/_shared/formatters/date-format.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'farm', 'job', 'status', 'edit'];
  data!: MatTableDataSource<any>;
  companyId = localStorage.getItem('companyId');
  dataSource!: MatTableDataSource<IEmployeeList>;
  alertMessage!: IAlert;
  @Input() employeesList: any[] = [];
  employees: any;
  farms: any;
  objInfos: IEmployeeList = {
    id: '',
    name: '',
    farmId: '',
    companyId: '',
    status: true,
    job: '',
    hiringDate: '',
    farmName: ''
  };
  listItems: any = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private farmService: FarmService,
    private alertService: AlertService,
    private employeeService: EmployeeService,
    private dateFormatService: DateFormatService,
  ) { }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.getInfos();

  }

  setUpTable() {
    try {
      this.listItems.forEach((employee: IEmployeeList) => this.dateFormatService.convertDateToSettingsFormat(employee.hiringDate));
      this.dataSource = new MatTableDataSource<IEmployeeList>(this.listItems);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      this.alertMessage = {
        title: 'Ocorreu um erro ao buscar as propriedades cadastradas',
        message: 'Entre em contato com o administrador do sistema.',
      };

      this.alertService.showAlertError(this.alertMessage);
    }
  }

  async getInfos() {
    const getEmployeesByCompanyId = await this.getEmployeesByCompanyId();
    const getAllFarmsByCompany = await this.getAllFarmsByCompany(
      getEmployeesByCompanyId
    );
    const mergeInformations = await this.mergeInformations(
      getAllFarmsByCompany
    );
    this.setUpTable();
  }

  updateEmplyee(employeeId: string) {
    let employeeFinded: IEmployeeByCompany;

    employeeFinded = this.employees.find((employee: IEmployeeByCompany) => employee.id == employeeId);

    const employeeToUpdate = {
      name: employeeFinded.name,
      farmID: employeeFinded.farmId,
      job: employeeFinded.job,
      status: employeeFinded.status
    }

    this.employeeService.updateEmployee(employeeToUpdate, employeeId).subscribe(
      (result: any) => {
        location.reload();
    });
  }

  getEmployeesByCompanyId() {
    return new Promise((resolve, reject) => {
      try {
        this.employeeService
          .getAllEmployeesByCompany(this.companyId)
          .subscribe((data: IEmployeeByCompany[]) => {
            this.employees = data;
            resolve({ sucess: true });
          });
      } catch (error) {
        reject({ sucess: false });
      }
    });
  }


  getAllFarmsByCompany(response: any) {
    return new Promise((resolve, reject) => {
      if (response.sucess) {
        try {
          this.farmService
            .getAllFarmsByCompany(this.companyId)
            .subscribe((data: any) => {
              this.farms = data;
              resolve({ sucess: true });
            });
        } catch (error) {
          reject({ sucess: false });
        }
      }
    });
  }

  mergeInformations(response: any) {
    let teste = '';
    return new Promise((resolve, reject) => {
      if (response.sucess) {
        try {
          for (let index1 = 0; index1 < this.employees.length; index1++) {
            let foundFarm = false;
            for (let index2 = 0; index2 < this.farms.length; index2++) {
              if (this.employees[index1].farmId == this.farms[index2].id) {
                this.objInfos = {
                  id: '',
                  name: '',
                  farmId: '',
                  companyId: '',
                  status: true,
                  job: '',
                  hiringDate: '',
                  farmName: ''
                };



                this.objInfos.id = this.employees[index1].id;
                this.objInfos.name = this.employees[index1].name;
                this.objInfos.farmId = this.employees[index1].farmId;
                this.objInfos.companyId = this.employees[index1].companyId;
                this.objInfos.status = this.employees[index1].status;
                this.objInfos.job = this.employees[index1].job;
                this.objInfos.hiringDate = this.employees[index1].hiringDate;
                this.objInfos.farmName = this.farms[index2].name;
                this.listItems.push(this.objInfos);

                foundFarm = true;

              }
            }

            if(!foundFarm){
              this.objInfos = {
                id: '',
                name: '',
                farmId: '',
                companyId: '',
                status: true,
                job: '',
                hiringDate: '',
                farmName: ''
              }
              this.objInfos.id = this.employees[index1].id
              this.objInfos.name = this.employees[index1].name;
              this.objInfos.farmId = this.employees[index1].farmId;
              this.objInfos.companyId = this.employees[index1].companyId;
              this.objInfos.status = this.employees[index1].status;
              this.objInfos.job = this.employees[index1].job;
              this.objInfos.hiringDate = this.employees[index1].hiringDate;
              this.objInfos.farmName = "Sem Fazenda vinculada";
              this.listItems.push(this.objInfos);


            }
          }
          resolve({ sucess: true });
        } catch (error) {
          reject({ sucess: false });
        }
      }
    });
  }

}
