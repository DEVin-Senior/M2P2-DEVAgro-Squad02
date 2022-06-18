import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IAlert } from 'src/app/_interfaces/alert/ialert';
import { IGrainByCompany } from 'src/app/_interfaces/grain/igrain-by-company';
import { GrainService } from 'src/app/_services/grain/grain.service';
import { AlertService } from 'src/app/_shared/alert/alert.service';
import { FarmService } from 'src/app/_services/farm/farm.service';
import { IFarm } from 'src/app/_interfaces/farm/ifarm';
import { IGrainList } from 'src/app/_interfaces/grain/grain';
import { GrainEditComponent } from 'src/app/_views/grain/grain-edit/grain-edit.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ERROR, SUCCESS } from 'src/environments/environment';

@Component({
  selector: 'app-grains-query',
  templateUrl: './grains-query.component.html',
  styleUrls: ['./grains-query.component.css'],
})
export class GrainsQueryComponent implements OnInit {
  menuName: string = 'Grãos';
  displayedColumns: string[] = ['grain', 'plantedFarm', 'harvested', 'edit'];
  companyId = localStorage.getItem('companyId');
  dataSource!: MatTableDataSource<IGrainList>;
  alertMessage!: IAlert;
  farms: any;
  grains: any;
  objInfos: IGrainList = {
    id: '',
    grain: '',
    plantedFarm: '',
    harvested: false,
  };
  listItems: any = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private grainService: GrainService,
    private alertService: AlertService,
    private farmService: FarmService,
    private redirectRout: Router
  ) {}

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.getInfos();
  }

  updateGrain(grainId: string, isHarvested: boolean) {
    let grainFinded: IGrainByCompany;

    grainFinded = this.grains.find((grain: IGrainByCompany) => grain.id == grainId);

    const grainToUpdate = {
      name: grainFinded.name,
      companyId: grainFinded.company.id,
      nextHarvestDate: grainFinded.nextHarvestDate,
      additionalInformation: grainFinded.additionalInformation,
      harvested: isHarvested,
    }

    this.grainService.updateGrain(grainToUpdate, grainId).subscribe(
      (result: any) => {
        location.reload();
    });
  }

  setUpTable() {
    try {
      this.dataSource = new MatTableDataSource<IGrainList>(this.listItems);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      console.log(error);
      this.alertMessage = {
        title: 'Ocorreu um erro ao buscar as propriedades cadastradas',
        message: 'Entre em contato com o administrador do sistema.',
      };

      this.alertService.showAlertError(this.alertMessage);
    }
  }

  getGrainsByCompanyId() {
    return new Promise((resolve, reject) => {
      try {
        this.grainService
          .getAllGrainsByCompany(this.companyId)
          .subscribe((data: any) => {
            this.grains = data;
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

  async getInfos() {
    const getGrainsByCompanyId = await this.getGrainsByCompanyId();
    const getAllFarmsByCompany = await this.getAllFarmsByCompany(
      getGrainsByCompanyId
    );
    const mergeInformations = await this.mergeInformations(
      getAllFarmsByCompany
    );
    this.setUpTable();
  }

  mergeInformations(response: any) {
    return new Promise((resolve, reject) => {
      if (response.sucess) {
        try {
          for (let index1 = 0; index1 < this.grains.length; index1++) {
            for (let index2 = 0; index2 < this.farms.length; index2++) {
              if (this.grains[index1].id == this.farms[index2].grain.id) {
                this.objInfos = {
                  id: '',
                  grain: '',
                  plantedFarm: '',
                  harvested: false,
                };
                // console.log('Achei item, montando OBJ');
                this.objInfos.id = this.grains[index1].id;
                this.objInfos.grain = this.grains[index1].name;
                this.objInfos.plantedFarm = this.farms[index2].name;
                this.objInfos.harvested = this.grains[index1].harvested;

                // console.log('this.objInfos.grain ' + this.objInfos.grain);
                // console.log('this.objInfos.harvested ' + this.objInfos.harvested);
                // console.log('this.objInfos.plantedFarm ' + this.objInfos.plantedFarm);

                this.listItems.push(this.objInfos);

                // console.log('this.objInfos.length() ' + this.listItems.length);
              }
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
