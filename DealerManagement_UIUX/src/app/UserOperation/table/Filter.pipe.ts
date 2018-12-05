import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], status: string): any[] {
    if (!items) return [];
    if (!status) return items;

    return items.filter(item => {
      if (status === "All") {
        return true;
      } else {

        if (item['commissionSettlement'] == status) {
          return true;
        } else {
         if(item['saleType'] == status){
           return true;
         }else{
           return false;
         }
        }
      }

    });
  }
}

