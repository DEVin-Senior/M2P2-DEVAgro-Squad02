import { Injectable } from '@angular/core';
import { IAlert } from 'src/app/_interfaces/alert/ialert';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  private show(titleAlert: string, messageAlert: string, iconAlert: SweetAlertIcon):void{
    Swal.fire(titleAlert, messageAlert, iconAlert);
  }

  public showAlert(alert: IAlert){
    this.show(alert.title!, alert.message, alert.typeError)
  }
}
