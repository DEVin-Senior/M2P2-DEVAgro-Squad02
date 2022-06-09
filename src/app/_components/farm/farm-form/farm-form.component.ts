import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAlert } from 'src/app/_interfaces/alert/ialert';
import { IFarm } from 'src/app/_interfaces/farm/ifarm';
import { AlertService } from 'src/app/_services/alert/alert.service';
import { FarmService } from 'src/app/_services/farm/farm.service';

@Component({
  selector: 'app-farm-form',
  templateUrl: './farm-form.component.html',
  styleUrls: ['./farm-form.component.css'],
})
export class FarmFormComponent implements OnInit {
  @Input() currentUser: any = {};
  farmForm!: FormGroup;
  btnName: string = 'CADASTRAR';
  formSended: boolean = false;
  requestFinished: boolean = false;
  alertMessage!: IAlert;

  constructor(
    private farmService: FarmService,
    private alertService: AlertService
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
      stock: new FormControl(0, [Validators.required])
    });
  }

  get name(){
    return this.farmForm.get('name')!;
  }

  get address(){
    return this.farmForm.get('address')!;
  }

  get grainId(){
    return this.farmForm.get('grainId')!;
  }

  get lastHarvest(){
    return this.farmForm.get('lastHarvest')!;
  }

  get stock(){
     return this.farmForm.get('stock')!;
  }

  saveNewFarm() {
    if(this.farmForm.invalid){
      this.formSended = false;
      return;
    }

    const newFarm: IFarm = {
      name: this.name.value,
      address: this.address.value,
      companyId: "1",
      grainId: this.grainId.value,
      lastHarvest: this.lastHarvest.value,
      stock: this.stock.value,
    };

    this.farmService
      .saveFarm(newFarm)
      .then((newFarm) => {
        this.formSended = true;
        this.alertMessage = {
          title: "",
          message: "Fazenda cadastrada com sucesso!",
          typeError: 'success'
        };
        this.farmForm.reset();
      })
      .catch((error) => {
        this.formSended = false;
        this.alertMessage = {
          title: "Ocorreu um erro ao cadastrar a fazenda",
          message: error.error.message != null ? error.error.message : "Entre em contato com o administrador do sistema.",
          typeError: 'error'
        };
      })
      .finally(() => {
        this.requestFinished = true;
        this.alertService.showAlert(this.alertMessage);
      });
  }
}
