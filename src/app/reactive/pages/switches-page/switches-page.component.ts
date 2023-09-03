import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent {

  public myForm:FormGroup = this.fb.group({
    gender:['M', Validators.required],
    wantNotifactions: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  });

  constructor(private fb:FormBuilder){}

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

  onSave(){
    if (this.myForm.invalid){
      this.myForm.markAllAsTouched;
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset();
  }

}
