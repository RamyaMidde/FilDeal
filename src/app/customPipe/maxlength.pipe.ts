import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxlength'
})
export class MaxlengthPipe implements PipeTransform {

  transform(value: string, maxlength: number): any {
    return value.slice(0, maxlength);
   
  }

}
