import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'company',
    'job',
    'status',
    'edit',
  ];

  data!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() employeesList!: any;

  ngOnInit(): void {
    this.employeesList.map((employee: any) => employee.hiringDate = moment().format('DD/MM/yyyy'))
    this.data = new MatTableDataSource<any>(this.employeesList);
    this.data.paginator = this.paginator;
  }
}
