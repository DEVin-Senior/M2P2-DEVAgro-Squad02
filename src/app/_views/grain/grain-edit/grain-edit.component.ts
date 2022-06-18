import { IFarmPut } from 'src/app/_interfaces/farm/ifarm';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAlert } from 'src/app/_interfaces/alert/ialert';
import { FarmService } from 'src/app/_services/farm/farm.service';
import { GrainService } from 'src/app/_services/grain/grain.service';
import { AlertService } from 'src/app/_shared/alert/alert.service';
import { ERROR, SUCCESS } from 'src/environments/environment';
import { IGrainByCompany } from './../../../_interfaces/grain/igrain-by-company';

@Component({
  selector: 'app-grain-edit',
  templateUrl: './grain-edit.component.html',
  styleUrls: ['./grain-edit.component.css']
})
export class GrainEditComponent implements OnInit {

  menuName: string = 'Editar Grãos';
  public grainForm: any = [];
  formSended: boolean = false;
  alertMessage!: IAlert;
  companies: any = [];
  grain: IGrainByCompany = {
    id: '',
    name: '',
    averageHarvestTime: 0,
    company: '',
    nextHarvestDate: '',
    additionalInformation: '',
    harvested: false
  };
  grainFarmId: any;
  companyId = localStorage.getItem('companyId');
  farm: any;
  newGrain: any;

  constructor(
    private rest: GrainService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private farmService: FarmService,
    private route: ActivatedRoute,
    private redirectRout: Router) { }

  ngOnInit() {
    this.getAllfarm();
    this.getGrain();
    this.grainForm = this.fb.group({
      name: ['', [Validators.required]],
      companyId: [this.companyId],
      nextHarvestDate: ['', [Validators.required]],
      additionalInformation: [''],
      farmProducesId: [],
      harvested: [false]
    });
    this.getGrainFarm();
  }

  public updateGrain() {
    if (this.grainForm.valid) {
      this.setNewGrain();
      console.log(this.newGrain);

      this.rest.updateGrain(this.newGrain, this.grain.id).subscribe((result: any) => {
        if (result.name) {
          this.alertMessage = {
            title: '',
            message: 'Grão alterado com sucesso!',
            typeAlert: SUCCESS,
          };
          this.putFarm();
          this.alertService.showGenericAlert(this.alertMessage);
          this.grainForm.reset();
          this.redirectRout.navigate(["/grain/list"]);
        } else {
          this.alertMessage = {
            title: 'Ocorreu um erro ao editar o Grão',
            message: 'Entre em contato com o administrador do sistema.',
            typeAlert: ERROR,
          };
        }
      });
    } else {
      this.alertMessage = {
        title: 'Ocorreu um erro ao editar o Grão - Favor Preencher todos os campos obrigatórios',
        message: 'Entre em contato com o administrador do sistema.',
        typeAlert: ERROR,
      };
      this.alertService.showGenericAlert(this.alertMessage);
    }
  }

  getAllfarm() {
    this.farmService.getAllfarm().subscribe((data) => {
      this.companies = data;
    });
  }

  putFarm() {
    const farmId = this.grainForm.value.farmProducesId;

    if (farmId != null) {
      this.companies.forEach((farm: any) => {
        if (farm.id == farmId) {
          this.farm = farm;
        }
      });

      this.farm.grainId = this.grain.id;
      console.log(this.farm);


      this.farmService.putFarm(this.farm);
    };
  }

  async getGrain() {
    const grainId = this.route.snapshot.params['id'];

    await this.rest.getGrainById(grainId).then((res: any) => {
      this.grain.id = res[0].id;
      this.grain.name = res[0].name;
      this.grain.averageHarvestTime = res[0].averageHarvestTime;
      this.grain.company = res[0].company;
      this.grain.nextHarvestDate = res[0].nextHarvestDate;
      this.grain.additionalInformation = res[0].additionalInformation;
      this.grain.harvested = res[0].harvested;
    });

  }

  getGrainFarm() {
    this.farmService.getAllfarm().subscribe((data: any) => {
      data.forEach((farm: any) => {
        if (farm.grain.id == this.grain.id) {
          this.farm = farm;
          this.grainFarmId = farm.id;
        }
      })
    });
  }

  setNewGrain() {
    this.newGrain = {
      name: this.grainForm.name ? this.grainForm.name : this.grain.name,
      companyId: this.companyId,
      nextHarvestDate: this.grainForm.nextHarvestDate ?
        this.grainForm.nextHarvestDate : this.grain.nextHarvestDate,
      additionalInformation: this.grainForm.additionalInformation ?
        this.grainForm.additionalInformation : this.grain.additionalInformation,
      harvested: this.grainForm.harvested ?
        this.grainForm.harvested : this.grain.harvested,
    }

  }

  toFarmPut(farm: any): IFarmPut {
    return {
      id: farm.id,
      name: farm.name,
      address: farm.address,
      company: {
        id: farm.company.id,
      },
      grainId: farm.grainId,
      lastHarvest: farm.lastHarvest,
      stock: farm.stock,
    }
  }

}
