import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';

/*
Classe com validações de formulário customizadas
Referência de estudo para aplicação desta solução: https://www.youtube.com/watch?v=34SUX2dF-vU
*/
export class FormValidations {
  static matchPassword(otherField: string) {
    return (formControl: any) => {
       //Se o campo estiver vazio, retorna uma exceção.
       if (otherField == null) {
        throw new Error('É necessário informar um campo válido.');
      }

       //Impede de fazer o match caso o formulário ainda não esteja preenchido (ex: na renderização da página)
       if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      // Pega o valor do campo do formulário e se estiver vazio retorna uma exceção
      const field = (<FormGroup>formControl.root).get(otherField);

      if(!field) {
        throw new Error('É necessário informar um campo válido.');
      }

      //Valida o match da senha
      if(field.value !== formControl.value){
        return {matchPassword : otherField};
      }

      return null;
    };
  }
}
