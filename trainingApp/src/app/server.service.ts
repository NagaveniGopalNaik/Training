import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private httpClient: HttpClient) {}

  loginData(data: any): Observable<any> {
    return this.httpClient.post(
      'https://training-management-app.herokuapp.com/authenticate',
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
}
