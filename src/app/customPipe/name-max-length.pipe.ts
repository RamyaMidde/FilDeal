import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameMaxLength'
})
export class NameMaxLengthPipe implements PipeTransform {

  transform(value: string, maxLenth: number = 0): any {
    return value.slice(0, maxLenth) + '...';
  }

}
