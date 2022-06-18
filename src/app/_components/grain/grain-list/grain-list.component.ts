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


@Component({
  selector: 'app-grains-list',
  templateUrl: './grain-list.component.html',
  styleUrls: ['./grain-list.component.css']
})
export class GrainListComponent implements OnInit {

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
    harvested: ''
  };
  listItems: any = [];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private grainService: GrainService,
    private alertService: AlertService,
    private farmService: FarmService
  ) { }

  ngOnInit(): void {
    this.paginator._intl.itemsPerPageLabel = "Itens por página";
    this.getInfos();
  }

  setUpTable() {
    try {
      this.dataSource = new MatTableDataSource<IGrainList>(this.listItems);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      console.log(error);
      this.alertMessage = {
        title: 'Ocorreu um erro ao buscar as propriedades cadastradas',
        message: 'Entre em contato com o administrador do sistema.'
      };

      this.alertService.showAlertError(this.alertMessage)
    }

  }

  getGrainsByCompanyId() {
    return new Promise((resolve, reject) => {
      try {
        this.grainService
          .getAllGrainsByCompany(this.companyId).subscribe((data: any) => {
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
          this.farmService.getAllFarmsByCompany(this.companyId).subscribe((data: any) => {
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
    const getAllFarmsByCompany = await this.getAllFarmsByCompany(getGrainsByCompanyId);
    const mergeInformations = await this.mergeInformations(getAllFarmsByCompany);
    this.setUpTable();
  }

  mergeInformations(response: any) {
    return new Promise((resolve, reject) => {
      if (response.sucess) {
        try {
          for (let index1 = 0; index1 < this.grains.length; index1++) {
            let foundFarm = false;
            for (let index2 = 0; index2 < this.farms.length; index2++) {
              if (this.grains[index1].id == this.farms[index2].grain.id) {
                this.objInfos = {
                  id: '',
                  grain: '',
                  plantedFarm: '',
                  harvested: ''
                }
                // console.log('Achei item, montando OBJ');
                this.objInfos.id = this.grains[index1].id
                this.objInfos.grain = this.grains[index1].name;
                if (index2 % 2 == 0) {
                  this.objInfos.harvested = 'Sim';
                  // this.grains[index1].averageHarvestTime;
                } else {
                  this.objInfos.harvested = 'Não';
                }

                this.objInfos.plantedFarm = this.farms[index2].name

                // console.log('this.objInfos.grain ' + this.objInfos.grain);
                // console.log('this.objInfos.harvested ' + this.objInfos.harvested);
                // console.log('this.objInfos.plantedFarm ' + this.objInfos.plantedFarm);

                this.listItems.push(this.objInfos);

                // console.log('this.objInfos.length() ' + this.listItems.length);
                foundFarm = true;
              }
            }

            if(!foundFarm){
              this.objInfos = {
                id: '',
                grain: '',
                plantedFarm: '',
                harvested: ''
              }
              this.objInfos.id = this.grains[index1].id
              this.objInfos.grain = this.grains[index1].name;
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
