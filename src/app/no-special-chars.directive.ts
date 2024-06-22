import { Directive, HostListener  } from '@angular/core';

@Directive({
  selector: '[appNoSpecialChars]'
})
export class NoSpecialCharsDirective {

  constructor() { }
  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    // Allow navigation when backspace key is pressed
    if (event.key === 'Backspace' || event.key === 'Delete') {
      return;
    }
    const allowedChars = /[0-9]/;
    const charCode = event.key.charCodeAt(0);
    if (!allowedChars.test(event.key) || charCode === 32) { // Allow numbers and space
      event.preventDefault();
    }
  }
}
