import { SweetAlertIcon } from "sweetalert2";

export interface IAlert {
  title?: string,
  message: string,
  typeError: SweetAlertIcon // info, success, error
}
