import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GrainService } from 'src/app/_services/grain/grain.service';
import { AlertService } from 'src/app/_shared/alert/alert.service';
import { IAlert } from 'src/app/_interfaces/alert/ialert';
import { ERROR, SUCCESS } from 'src/environments/environment';
import { FarmService } from 'src/app/_services/farm/farm.service';
import { CompanyService } from 'src/app/_services/company/company.service';
import { Router } from '@angular/router';
import { IFarmPut } from 'src/app/_interfaces/farm/ifarm';


@Component({
  selector: 'app-grain-form',
  templateUrl: './grain-form.component.html',
  styleUrls: ['./grain-form.component.css']
})
export class GrainFormComponent implements OnInit {

  btnName: string = 'CADASTRAR';
  menuName: string = 'Grãos';
  public grainForm: any = [];
  formSended: boolean = false;
  alertMessage!: IAlert;
  companies: any = [];
  companyId: any = 0;
  farms: any = [];
  objFarm: any = {}
  farmProducesId: any;
  companyIdGrain: any;
  newGrainId: any;

  farm: IFarmPut = {
    name: '',
    address: '',
    company: {
     id: '',
     },
    grainId: '',
    lastHarvest: '',
    stock: 0
  }

  constructor(
    private rest: GrainService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private farmService: FarmService,
    private companyService: CompanyService,
    private router: Router) {
    this.companyId = this.companyService.getIdCompanyLoggedIn()
  }

  ngOnInit(): void {
    this.getAllFarmsByCompany();
    this.grainForm = this.fb.group({
      name: ['', [Validators.required]],
      companyId: [this.companyId],
      nextHarvestDate: ['', [Validators.required]],
      additionalInformation: [''],
      farmProducesId: [],
      harvested: [false],
    });
  }

  createGrain() {
    if (this.grainForm.valid) {
      try {
        this.rest.postGrain(this.grainForm.value).subscribe({
          next: (v) => this.updateFarmIdgrain(v),
          error: (e) => this.messageErrorPostGrain(),
          complete: () => ''
        })
      } catch (error) {
        this.messageErrorPostGrain()
      }
    } else {
      this.alertMessage = {
        title: 'Ocorreu um erro ao cadastrar o Grão',
        message: 'Favor preencher todos os campos obrigatórios.',
        typeAlert: ERROR,
      };
      this.alertService.showGenericAlert(this.alertMessage);
    }
  }

  updateFarmIdgrain(result: any) {
    this.newGrainId = result.id;
    this.farmProducesId = this.grainForm.value.farmProducesId;

    if (this.farmProducesId != null) {
      this.putGrainInFarm();
    }
  }


  getAllFarmsByCompany() {
    this.farmService.getAllFarmsByCompany(this.companyId).subscribe((data) => {
      this.companies = data;
    });
  }

  messagePostGrain(result: any) {
    if (result.name) {
      this.alertMessage = {
        title: '',
        message: 'Grão cadastrada com sucesso!',
        typeAlert: SUCCESS,
      };
      this.alertService.showGenericAlert(this.alertMessage);
      this.grainForm.reset();

    } else {
      this.alertMessage = {
        title: 'Ocorreu um erro ao cadastrar o Grão',
        message: 'Entre em contato com o administrador do sistema.',
        typeAlert: ERROR,
      };
    }
  }

  messageErrorPostGrain() {
    this.alertMessage = {
      title: 'Ocorreu um erro ao cadastrar o Grão',
      message: 'Entre em contato com o administrador do sistema.',
      typeAlert: ERROR,
    };
    this.alertService.showGenericAlert(this.alertMessage);
  }

  getFarmById() {
    return new Promise((resolve, reject) => {
      try {
        this.farmService.getAllfarm().subscribe((data: any) => {
          this.farm = data.find((farm: IFarmPut) => farm.id == this.farmProducesId);
          this.farm.grainId = this.newGrainId;
          resolve({ sucess: true });
        });

      } catch (error) {
        reject({ sucess: false });
      }

    });
  }

  putFarm(reponse: any) {
    return new Promise((resolve, reject) => {
      if (reponse.sucess) {
        this.farmService.putFarm(this.farm).subscribe({
          next: (v) => this.messagePostGrain(v),
          error: (e) => this.messageErrorPostGrain(),
          complete: () => this.router.navigate(['grain/list'])
        });
      }
    });
  }

  async putGrainInFarm() {
    let getFarmById = await this.getFarmById();
    await this.putFarm(getFarmById);
  }

}


