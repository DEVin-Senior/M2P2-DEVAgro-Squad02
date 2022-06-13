import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IAlert } from 'src/app/_interfaces/alert/ialert';
import { IFarmNextHarvest } from 'src/app/_interfaces/farm/ifarm-next-harvest';
import { FarmService } from 'src/app/_services/farm/farm.service';
import { AlertService } from 'src/app/_shared/alert/alert.service';
import { DateFormatService } from 'src/app/_shared/formatters/date-format.service';

@Component({
  selector: 'app-farm-table',
  templateUrl: './farm-table.component.html',
  styleUrls: ['./farm-table.component.css'],
})
export class FarmTableComponent implements OnInit {
  displayedColumns = ['name', 'nextHarvest'];
  companyId = localStorage.getItem('companyId');
  farmsWithNextHarvest!: MatTableDataSource<IFarmNextHarvest>;
  alertMessage!: IAlert;

  constructor(
    private farmService: FarmService,
    private dateFormatService: DateFormatService,
    private alertService: AlertService
    ) {}

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = "Itens por página";
    this.getNextHarvestByCompanyId();
  }

  //Busca todas as filiais da empresa logada com a data prevista da próxima colheita
  getNextHarvestByCompanyId() {
    this.farmService
      .getNextHarvestByCompany(this.companyId)
      .subscribe({
        next: (farms: IFarmNextHarvest[]) => {
        farms.forEach((farm: IFarmNextHarvest) => farm.nextHarvest = this.dateFormatService.convertDateToSettingsFormat(farm.nextHarvest)); //converte data para o formato dia/mês/ano
        this.farmsWithNextHarvest = new MatTableDataSource<IFarmNextHarvest>(farms);
        this.farmsWithNextHarvest.paginator = this.paginator;
      },
      error: (error) => {
        this.alertMessage = {
          title: 'Ocorreu um erro ao buscar as propriedades cadastradas',
          message: error.error != null ? error.error : 'Entre em contato com o administrador do sistema.'
        };
        this.alertService.showAlertError(this.alertMessage)
      }
    });

  }
}
