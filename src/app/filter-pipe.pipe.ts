import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(items: any[], status: string): any[] {
    if(!items) return [];
    if(!status) return items;

return items.filter( item => {
      if(status=="All"){
          return true;
      }
      return item.includes(status);
    });
   }

}
