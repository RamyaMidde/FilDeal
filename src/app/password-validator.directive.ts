import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appPasswordValidator]'
})
export class PasswordValidatorDirective {

  constructor() { }
  // @HostListener('keydown', ['$event'])
  // handleKeyDown(event: KeyboardEvent) {
  //   // Allow navigation when backspace key is pressed
  //   if (event.key === 'Backspace' || event.key === 'Delete') {
  //     return;
  //   }

  //   const allowedChars = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[^\s]{8,15}$/;
  //   const charCode = event.key.charCodeAt(0);
  //   if (!allowedChars.test(event.key) || charCode === 32) { // Allow numbers and space
  //     event.preventDefault();
  //   }
  // }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    // Allow navigation when backspace key is pressed
    if (event.key === 'Backspace' || event.key === 'Delete') {
      return;
    }
  
    // Define allowed characters using a regular expression
    const allowedChars = /[0-9a-zA-Z@#$%^&*()_+={}[\]:;'"|\\<>,./?~`]/;
  
    // Check if the pressed key is not an allowed character or it's a space character
    if (!allowedChars.test(event.key) || event.key === ' ') { // Disallow space
      event.preventDefault(); // Prevent the default action (typing the character)
    }
  }
  

}
