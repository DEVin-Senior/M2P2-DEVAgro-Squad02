import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-grains-query',
  templateUrl: './grains-query.component.html',
  styleUrls: ['./grains-query.component.css']
})
export class GrainsQueryComponent implements OnInit {

  menuName: string = 'Grãos';

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['grain', 'plantedFarm', 'harvested'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  grain: string;
  plantedFarm: string;
  harvested: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { grain: 'Grao Teste', plantedFarm: 'Fazenda Teste', harvested: 'sim' },
  { grain: 'Grao Teste', plantedFarm: 'Fazenda Teste', harvested: 'sim' },
  { grain: 'Grao Teste', plantedFarm: 'Fazenda Teste', harvested: 'sim' },
  { grain: 'Grao Teste', plantedFarm: 'Fazenda Teste', harvested: 'sim' },
  { grain: 'Grao Teste', plantedFarm: 'Fazenda Teste', harvested: 'sim' },
  { grain: 'Grao Teste', plantedFarm: 'Fazenda Teste', harvested: 'sim' } 
];