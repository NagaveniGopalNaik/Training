import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const API_URL=environment.API_URL;
@Injectable({
  providedIn: 'root',
})
export class ServerService {

  // active=true;
  // upcoming=false;
  // completed=false;
  // allEmployees=false;
  // displayFilter=false;

  constructor(private httpClient: HttpClient) {}

  loginData(data: any): Observable<any> {
    return this.httpClient.post(
      `${API_URL}/authenticate`,
      data,
      { responseType: "text" }
    );
  }

  getOtp(data:any):Observable<any>{
    return this.httpClient.put('https://training-management-app.herokuapp.com/employee/otpMail',data,
    { responseType: "text" })
  }

  checkOtp(data:any):Observable<any>{
    return this.httpClient.put('https://training-management-app.herokuapp.com/employee/checkCode',data, { responseType:'text'});
  }

  changePassword(data:any):Observable<any>{
    return this.httpClient.put('https://training-management-app.herokuapp.com/employee/changePassword',
    data,
     { responseType:'text'});
  }

  // activeFunction(){
  //   this.upcoming=false;
  //   this.completed=false;
  //   this.active=true;
  //   this.allEmployees=false;
  // }
  // upcomingFunction(){
  //   this.upcoming=true;
  //   this.completed=false;
  //   this.active=false;
  //   this.allEmployees=false;
  // }
  // completeFunction(){
  //   this.upcoming=false;
  //   this.completed=true;
  //   this.active=false;
  //   this.allEmployees=false;
  // }

  // allEmployeeFunction(){
  //   this.upcoming=false;
  //   this.completed=false;
  //   this.active=false;
  //   this.allEmployees=true;
  // }
}
