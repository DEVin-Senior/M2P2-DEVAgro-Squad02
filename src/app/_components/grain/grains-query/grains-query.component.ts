import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IAlert } from 'src/app/_interfaces/alert/ialert';
import { IGrainByCompany} from 'src/app/_interfaces/grain/igrain-by-company';
import { GrainService } from 'src/app/_services/grain/grain.service';
import { AlertService } from 'src/app/_shared/alert/alert.service';

@Component({
  selector: 'app-grains-query',
  templateUrl: './grains-query.component.html',
  styleUrls: ['./grains-query.component.css']
})
export class GrainsQueryComponent implements OnInit {

  menuName: string = 'Grãos';
  displayedColumns: string[] = ['grain', 'plantedFarm', 'harvested'];
  companyId = localStorage.getItem('companyId');
  dataSource!: MatTableDataSource<IGrainByCompany>;
  alertMessage!: IAlert;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  constructor(
    private grainService: GrainService,
    private alertService: AlertService
    ) {}

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = "Itens por página";
    this.getGrainsByCompanyId();
  }

  getGrainsByCompanyId(){
    this.grainService
      .getAllGrainsByCompany(this.companyId)
      .subscribe({
        next: (grains: IGrainByCompany[]) => {
        this.dataSource = new MatTableDataSource<IGrainByCompany>(grains);
        this.dataSource.paginator = this.paginator;
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
