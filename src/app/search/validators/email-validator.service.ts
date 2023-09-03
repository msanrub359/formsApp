import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';

@Injectable({providedIn: 'root'})
export class emailValidator implements AsyncValidator {

  constructor() { }
  // validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
  //   const email=control.value;
  //   console.log(email);

  //   return of({
  //     emailTaken:true
  //   }).pipe(
  //     delay(2000)
  //   )
  // }

  validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
      const email=control.value;
      console.log(email);

      const httpCallObservable=new Observable<ValidationErrors|null>( (subscriber =>{
        console.log({email});

        if (email=="mluz@gmail.com"){
          subscriber.next({emailTaken: true})

        }else{
          subscriber.next(null)
        }
        subscriber.complete();
      }))

      return httpCallObservable


  }
}

