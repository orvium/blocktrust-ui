import { FormControl, ValidationErrors } from '@angular/forms';

export class customValidators {

  static validateURL(c: FormControl): ValidationErrors | null {
    const URL_REGEXP = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    if (c.value == null || c.value === '') {
      return null;
    }
    return URL_REGEXP.test(c.value) ? null : { 'invalidURL': true };
  }


}
