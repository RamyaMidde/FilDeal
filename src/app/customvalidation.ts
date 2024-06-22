import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password: string = control.value;
    if (password && password.trim().length !== password.length) {
      return { containsSpace: true }; // Password contains space
    }
    if (password && !/^[a-zA-Z@]+$/.test(password)) {
      return { containsNonLetters: true }; // Password contains non-letter characters or symbols other than "@"
    }
    return null; // Password is valid
  };
}
