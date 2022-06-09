import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAlert } from 'src/app/_interfaces/alert/ialert';
import { IFarm } from 'src/app/_interfaces/farm/ifarm';
import { AlertService } from 'src/app/_shared/alert/alert.service';
import { FarmService } from 'src/app/_services/farm/farm.service';
import { ERROR, SUCCESS } from 'src/environments/environment';
import { UserServiceService } from 'src/app/_services/user/user-service.service';

@Component({
  selector: 'app-farm-form',
  templateUrl: './farm-form.component.html',
  styleUrls: ['./farm-form.component.css'],
})
export class FarmFormComponent implements OnInit {
  farmForm!: FormGroup;
  btnName: string = 'CADASTRAR';
  formSended: boolean = false;
  requestFinished: boolean = false;
  alertMessage!: IAlert;
  companyIdFromCurrentUser: string | null = localStorage.getItem('companyId');

  constructor(
    private farmService: FarmService,
    private alertService: AlertService,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.farmForm = this.getFormConfiguration();
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

  private postFarm(newFarm: IFarm){
    this.farmService.saveFarm(newFarm).subscribe({
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
          message: error.error.message != null ? error.error.message : 'Entre em contato com o administrador do sistema.',
          typeAlert: ERROR,
        };
      },
    }).add(() => {
      this.requestFinished = true;
      this.alertService.showGenericAlert(this.alertMessage);
    });
  }
}
