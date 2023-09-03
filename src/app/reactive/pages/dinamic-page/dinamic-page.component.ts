import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

type NewType = FormBuilder;

@Component({
  selector: 'app-dinamic-page',
  templateUrl: './dinamic-page.component.html',
  styles: [
  ]
})
export class DinamicPageComponent  {

  public myForm: FormGroup = this.fb.group({
    name: ['',[Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ])
  })

  public newFavorite: FormControl=new FormControl('', Validators.required)

  get favoriteGames(){
    return this.myForm.get("favoriteGames") as FormArray
  }

  constructor (private fb:FormBuilder){}
  isValidField(field:string):boolean | null{
    return this.myForm.controls[field].errors
     && this.myForm.controls[field].touched
  }

  isValidFieldInArray(formArray:FormArray, index:number){
    return formArray.controls[index].errors
     && formArray.controls[index].touched
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

  onDeleteFavorite(index:number):void{
    this.favoriteGames.removeAt(index);
  }

  onAddToFavorite(){
    
    if(this.newFavorite.invalid) return;

    const newGame= this.newFavorite.value;
    //añadir favoritos
    this.favoriteGames.push(this.fb.control(newGame, Validators.required));
    //limpiar
    this.newFavorite.reset();

  }
  onSubmit():void{
    if (this.myForm.invalid){
      this.myForm.markAllAsTouched;
      return;
    }
    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray)= this.fb.array([])
    this.myForm.reset()
  }
}
