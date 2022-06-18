import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAlert } from 'src/app/_interfaces/alert/ialert';
import { IFarm } from 'src/app/_interfaces/farm/ifarm';
import { AlertService } from 'src/app/_shared/alert/alert.service';
import { FarmService } from 'src/app/_services/farm/farm.service';
import { ERROR, SUCCESS } from 'src/environments/environment';
import { GrainService } from 'src/app/_services/grain/grain.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farm-form',
  templateUrl: './farm-form.component.html',
  styleUrls: ['./farm-form.component.css'],
})
export class FarmFormComponent implements OnInit {
  farmForm!: FormGroup;
  btnName: string = 'CADASTRAR';
  menuName: string = 'Fazenda';
  formSended: boolean = false;
  requestFinished: boolean = false;
  alertMessage!: IAlert;
  companyIdFromCurrentUser: string | null = localStorage.getItem('companyId');
  grainsFromCompany: any = [];

  constructor(
    private farmService: FarmService,
    private alertService: AlertService,
    private grainService: GrainService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.farmForm = this.getFormConfiguration();
    this.getAllGrainsByCompany();
  }

  getFormConfiguration() {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      grainId: new FormControl('', [Validators.required]),
      lastHarvest: new FormControl('', [Validators.required]),
      stock: new FormControl(0, [Validators.required]),
    });
  }

  getAllGrainsByCompany() {
    this.grainService.getAllGrainsByCompany(this.companyIdFromCurrentUser).subscribe((data) => {
      this.grainsFromCompany = data;
    });
  }

  get name() {
    return this.farmForm.get('name')!;
  }

  get address() {
    return this.farmForm.get('address')!;
  }

  get grainId() {
    return this.farmForm.get('grainId')!;
  }

  get lastHarvest() {
    return this.farmForm.get('lastHarvest')!;
  }

  get stock() {
    return this.farmForm.get('stock')!;
  }

  compareGrain(grain1: any, grain2: any) {
    return grain1 && grain2 ? grain1.id === grain2.id : grain1 === grain2;
  }

  createNewFarm(): IFarm {
    return {
      name: this.name.value,
      address: this.address.value,
      companyId: this.companyIdFromCurrentUser!,
      grainId: this.grainId.value,
      lastHarvest: this.lastHarvest.value,
      stock: this.stock.value,
    };
  }

  saveNewFarm() {
    if (this.farmForm.invalid) {
      this.formSended = false;
      return;
    }

    const newFarm = this.createNewFarm();

    this.postFarm(newFarm);
  }

  private postFarm(newFarm: IFarm) {
    this.farmService
      .saveFarm(newFarm)
      .subscribe({
        complete: () => {
          this.formSended = true;
          this.alertMessage = {
            title: '',
            message: 'Fazenda cadastrada com sucesso!',
            typeAlert: SUCCESS,
          };
          this.farmForm.reset();
        },
        error: (error) => {
          this.formSended = false;
          this.alertMessage = {
            title: 'Ocorreu um erro ao cadastrar a fazenda',
            message:
              error.error.message != null
                ? error.error.message
                : 'Entre em contato com o administrador do sistema.',
            typeAlert: ERROR,
          };
        },
      })
      .add(() => {
        this.requestFinished = true;
        this.alertService.showGenericAlert(this.alertMessage = {
          title: '',
          message: 'Fazenda cadastrada com sucesso!',
          typeAlert: SUCCESS,
        });

        this.router.navigate(['farm/list']);
      });
  }
}
