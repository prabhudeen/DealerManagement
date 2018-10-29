import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'dateFilterPipe'
})
export class Datefilterpipe implements PipeTransform {
  transform(items: any, startTime: any, endTime: any): any {
    let filtered = [];

    console.log(startTime, endTime);
    if (startTime === undefined && endTime === undefined) {
      return items;
    } else if (startTime === null || endTime === null) {
      return items;
    } else {
      let from_date = Date.parse(startTime);
      let to_date = Date.parse(endTime);
      items.forEach((item, index) => {
        console.log(item.date);
        if (item.txCreatedTime*1000 > from_date && item.txCreatedTime*1000 < to_date) {
          filtered.push(item);
        }
      });
    }
    console.log(filtered);
    return filtered;
  }
}
