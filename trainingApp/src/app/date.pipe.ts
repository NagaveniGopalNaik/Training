import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateChange'
})
export class DateChangePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const data = value.split('-');
    const day = data[2];
    let currentDate = '';
    if(day[0]=='0'){
      data[2] = data[2][1];
    }
    if(day[1]=='1' && day != '11'){
      currentDate = data[2]+'st';
    } else if(day[1] == '2' && day != '12'){
      currentDate = data[2]+'nd';
    } else if(day[1] == '3' && day != '13'){
      currentDate = data[2]+'rd';
    } else{
      currentDate = data[2]+'th';
    }
    

    return currentDate;

  }

}

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const data = value.split(':');
    let hour = '';
    let meridian='';
    let time = '';
   if(Number(data[0]) > 12 ){
     let value = Number(data[0])-12;
     hour = String(value);
     meridian = 'pm';
   } else{
     hour = data[0];
     meridian = 'am'
   }

   if(hour[0] == '0'){
     hour = hour[1];
   }
   time = hour+":"+data[1]+" "+meridian;
    return time;

  }

}

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let data:any;
    let date:any;
   if(value != null){
    data = value.split(':');
    let hour = data[0];
    if(hour[0] == '0'){
    hour = hour[1];
    }
    if(data[1]== '0'){
      data[1]="";
    }
    date = hour+" hours "+data[1]+" mins"

    
    return date;
   }
   return null;

  }

}


@Pipe({
  name: 'endsIn'
})
export class EndsInPipe implements PipeTransform {

  transform(value: string, ...args: string[]): unknown {
   let date= args[0] as any;
   if(date!=null){
     date =date.split('-');
     
   }
   let time = args[1] as any;
  
   if(time != null){
     time = String(time.split('-'));
   }
   
  //  if(Number(time[0]+time[1]) > 12){
  //   time="hello";
  //   time = time[0];
  //   time[0] = String(Number(time[0]) + 12);
  //  }
  let h = String(time[0])+String(time[1]);
  let m = String(time[3])+String(time[4]);
   let today = new Date();
   let currentDate = new Date(JSON.parse(date[0] || today.getFullYear()),JSON.parse(date[1] || today.getMonth())-1,JSON.parse(date[2] || today.getDate()),Number(h),Number(m));
   let currentTime = currentDate.getTime();
 
   let times = today.getTime();
   
   let present = currentTime - times;
   let day =0;
   if(Number(h) > 12){
    day = Number((present / 86400000).toFixed(0))-1;
   } else {
    day = Number((present / 86400000).toFixed(0));
   }
   let hour = Number(((present% 86400000)/3600000).toFixed(0));
   let minute = (((present% 86400000)%3600000)/60000).toFixed(0)

   
   

    return String(day)+" days "+hour+" hours "+minute+" mins";
   

  }

}


