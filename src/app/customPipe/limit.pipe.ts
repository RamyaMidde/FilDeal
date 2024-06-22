import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitLength'
})
export class LimitPipe implements PipeTransform {

  transform(value:any, limit:number): any {
    return value.slice(0, limit);
  }

}
