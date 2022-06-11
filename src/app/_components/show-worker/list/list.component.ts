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
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'sim' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'não' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'sim' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'não' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'sim' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'não' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'sim' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'não' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'sim' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'não' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'sim' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'não' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'sim' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'não' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'sim' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'sim' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'não' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'sim' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'não' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'sim' },
];
