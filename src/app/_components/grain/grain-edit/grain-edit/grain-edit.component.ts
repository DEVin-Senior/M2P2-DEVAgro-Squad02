import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GrainService } from 'src/app/_services/grain/grain.service';
import { AlertService } from 'src/app/_shared/alert/alert.service';
import { IAlert } from 'src/app/_interfaces/alert/ialert';
import { ERROR, SUCCESS } from 'src/environments/environment';
import { FarmService } from 'src/app/_services/farm/farm.service';



@Component({
  selector: 'app-grain-edit',
  templateUrl: './grain-edit.component.html',
  styleUrls: ['./grain-edit.component.css']
})
export class GrainEditComponent implements OnInit {

  btnName: string = 'CADASTRAR';
  menuName: string = 'Grãos';
  public grainEdit: any = [];
  formSended: boolean = false;
  alertMessage!: IAlert;
  companies: any = [];

  constructor(
    private rest: GrainService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private farmService: FarmService) { }

  ngOnInit(): void {
    this.getAllfarm();
    this.grainEdit = this.fb.group({
      name: ['', [Validators.required]],
      companyId: ['', [Validators.required]],
      harvestForecast: ['', [Validators.required]],
      // additionalInformation:[]
    });
  }

  createGrain() {
    if (this.grainEdit.valid) {
      this.rest.postGrain(this.grainEdit.value).subscribe(result => {
        if (result.name) {
          this.alertMessage = {
            title: '',
            message: 'Grão cadastrada com sucesso!',
            typeAlert: SUCCESS,
          };
          this.alertService.showGenericAlert(this.alertMessage);
          this.grainEdit.reset();

        } else {
          this.alertMessage = {
            title: 'Ocorreu um erro ao cadastrar o Grão',
            message: 'Entre em contato com o administrador do sistema.',
            typeAlert: ERROR,
          };
        }
      });
    } else {
      this.alertMessage = {
        title: 'Ocorreu um erro ao cadastrar o Grão - Favor Preencher todos os campos obrigatórios',
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

}
