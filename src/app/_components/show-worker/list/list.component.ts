import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { FarmService } from 'src/app/_services/farm/farm.service';
import { AlertService } from 'src/app/_shared/alert/alert.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'farm', 'job', 'status', 'edit'];
  data!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() employeesList: any[] = [];

  constructor(
    private farmService: FarmService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.setFarmInEmployees();
    try {
      this.employeesList.map(
        (employee: any) => (employee.hiringDate = moment().format('DD/MM/yyyy'))
      );
      this.data = new MatTableDataSource<any>(this.employeesList);
      this.data.paginator = this.paginator;
    } catch (error) {
      
    }
  }

  setFarmInEmployees() {
    try {
      this.employeesList.forEach((employee: any) => {
        this.farmService
          .getAllFarmsByCompany(employee.company.id)
          .subscribe((farms: any) => {
            employee.farm = farms.find(
              (farm: any) => farm.id == employee.farmId
            ).name;
          });
      });
    } catch (error) {

    }
  }
}
