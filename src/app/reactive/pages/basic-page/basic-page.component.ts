import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent {

  public myForm: FormGroup=this.frmB.group({
    name: ['',[Validators.required,Validators.minLength(3)]],
    price:[0,[Validators.required, Validators.min(0)]],
    inStorage:[0,[Validators.required, Validators.min(0)]]
  })

  constructor(private frmB: FormBuilder){}

  isValidField(field:string):boolean | null{
    return this.myForm.controls[field].errors
     && this.myForm.controls[field].touched
  }

  getFieldError(field:string):string | null {

    if (!this.myForm.controls[field]) return null;

    const errors= this.myForm.controls[field].errors || {};
    for (const key of Object.keys(errors)){
      switch (key) {
        case 'required':
          return 'Este campo es requerido'
          break;
          case 'minlength':
            return `Mínimo ${errors['minlength'].requiredLength} caracteres`
            break;
        default:
          break;
      }

    }
    return null
  }
  onSave():void{
    if (!this.myForm.invalid){
      this.myForm.markAllAsTouched; //marca que todos los datos han sido tocados
      return;

    }
      console.log(this.myForm.value);
      this.myForm.reset({price:0, inStorage:0});


  }

}
