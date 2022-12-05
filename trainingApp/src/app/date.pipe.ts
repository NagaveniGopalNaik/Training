import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateChange'
})
export class DateChangePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const data = value.split('-');
    const day = data[1];
    let currentDate = '';
    if(day[1]=='1' && day != '11'){
      currentDate = data[1]+'st';
    } else if(day[1] == '2' && day != '12'){
      currentDate = data[1]+'nd';
    } else if(day[1] == '3' && day != '13'){
      currentDate = data[1]+'rd';
    } else{
      currentDate = data[1]+'th';
    }

    return currentDate;

  }

}
