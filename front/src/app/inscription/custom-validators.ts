import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {

  /**
   * Function to control email with custom validator
   */
  static mustMatch(control: AbstractControl): ValidationErrors | null {
    const group = control.parent
    const password : string = group?.get('password')?.value;
    const repeatPassword : string = group?.get('repeatPassword')?.value;
    return password === repeatPassword ? null : {
      mustMatch: true
    };
  }
}
