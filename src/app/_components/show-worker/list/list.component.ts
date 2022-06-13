import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'option',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  name: string;
  position: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 'João', name: 'Hydrogen', weight: 1.0079, symbol: 'sim' },
  { position: 'Pedro', name: 'Helium', weight: 4.0026, symbol: 'não' },
  { position: 'João', name: 'Lithium', weight: 6.941, symbol: 'sim' },
  { position: 'João', name: 'Beryllium', weight: 9.0122, symbol: 'não' },
  { position: 'João', name: 'Boron', weight: 10.811, symbol: 'sim' },
  { position: 'João', name: 'Carbon', weight: 12.0107, symbol: 'não' },
  { position: 'João', name: 'Nitrogen', weight: 14.0067, symbol: 'sim' },
  { position: 'João', name: 'Oxygen', weight: 15.9994, symbol: 'não' },
  { position: 'João', name: 'Fluorine', weight: 18.9984, symbol: 'sim' },
  { position: 'João', name: 'Neon', weight: 20.1797, symbol: 'não' },
  { position: 'João', name: 'Sodium', weight: 22.9897, symbol: 'sim' },
  { position: 'João', name: 'Magnesium', weight: 24.305, symbol: 'não' },
  { position: 'João', name: 'Aluminum', weight: 26.9815, symbol: 'sim' },
  { position: 'João', name: 'Silicon', weight: 28.0855, symbol: 'não' },
  { position: 'João', name: 'Phosphorus', weight: 30.9738, symbol: 'sim' },
  { position: 'João', name: 'Sulfur', weight: 32.065, symbol: 'sim' },
  { position: 'João', name: 'Chlorine', weight: 35.453, symbol: 'não' },
  { position: 'João', name: 'Argon', weight: 39.948, symbol: 'sim' },
  { position: 'João', name: 'Potassium', weight: 39.0983, symbol: 'não' },
  { position: 'João', name: 'Calcium', weight: 40.078, symbol: 'sim' },
];
