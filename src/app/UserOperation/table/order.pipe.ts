import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

    // transform(value: any, args?: any): any {
    //     let newVal = value.sort((a: any, b: any) => {
    //         let date1 = new Date(a.date);
    //         let date2 = new Date(b.date);

    //         if (date1 > date2) {
    //             return 1;
    //         } else if (date1 < date2) {
    //             return -1;
    //         } else {
    //             return 0;
    //         }
    //     });

    //     return newVal;
    // }\

    transform(array: Array<number>, args: string): Array<number> {
        array.sort((a: number, b: number) => {
          if (a[args] < b[args]) {
            return 1;
          } else if (a[args] > b[args]) {
            return -1;
          } else {
            return 0;
          }
        //   console.log(a + '>>' + b);
        //   console.log(a[column]);
        // let left =a[column]*1000;
        // console.log(left);
        // let right =b[column];
        // console.log(right);
        // return (direction === '-') ? right - left : left - right;
        });
        return array;
      }

}