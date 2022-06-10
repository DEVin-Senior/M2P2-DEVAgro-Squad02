import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GrainService } from 'src/app/_services/grain/grain.service';
import { AlertService } from 'src/app/_shared/alert/alert.service';



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

  constructor(
    private rest: GrainService,
    private fb: FormBuilder,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.grainForm = this.fb.group({
      name: ['', [Validators.required]],
      companyId: ['', [Validators.required]],
      harvestForecast: ['', [Validators.required]],
      // additionalInformation:[]
    });
  }

  createGrain() {
    if (this.grainForm.valid) {
      this.rest.postGrain(this.grainForm.value).subscribe(result => {
        if (result.name) {
          this.alertMessage = {
            title: '',
            message: 'Fazenda cadastrada com sucesso!',
            typeAlert: SUCCESS,
          };
          this.grainForm.reset();
          window.location.reload();
        } else {
          // Deu ruim no Post
        }
      });
    } else {
      console.log(this.grainForm);

    }

  }

}
