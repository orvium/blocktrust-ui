import { FormControl } from '@angular/forms';

export function getErrorMessage(control: FormControl): string {
  if (control.hasError('required')) {
    return 'You must enter a value';
  }
  if (control.hasError('email')) {
    return 'Not a valid email';
  }
  if (control.hasError('min')) {
    return 'Not a valid value';
  }
  return '';
}
