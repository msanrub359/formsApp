import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/search/service/validators.service';
import { emailValidator } from 'src/app/search/validators/email-validator.service';
import  * as customValidators  from 'src/app/search/validators/validators.';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  public myForm:FormGroup = this.fb.group({
    name:['', [Validators.required, Validators.pattern(customValidators.firstNameAndLastnamePattern)]],
    email: ['', [Validators.required, Validators.pattern(customValidators.emailPattern)],[new emailValidator()]],
    username: ['', [Validators.required, this.validatorsService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  }, {
    validators:[
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
    ]

  });

  constructor(private fb:FormBuilder,
    private validatorsService: ValidatorsService ){}

  isValidField(field:string){
    return this.validatorsService.isValidField(this.myForm, field)
  }
  onSave(){
    this.myForm.markAllAsTouched()
  }
}


