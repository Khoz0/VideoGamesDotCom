import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newestOrder'
})
export class NewestOrderPipe implements PipeTransform {
  transform(list: Array<any>): Array<any>  {
    return list.reverse();
  }
}
