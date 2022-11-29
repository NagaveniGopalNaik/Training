import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

token = JSON.parse(sessionStorage.getItem('token') as any);
  constructor(private http:HttpClient) { }

  registerEmployee(data:any):Observable<any>{
    // this.token = JSON.parse(sessionStorage.getItem('token') as any);
    
    // let decrypt_token =CryptoJS.AES.decrypt(token, "Token@superAdmin").toString(CryptoJS.enc.Utf8);
    //  console.log(decrypt_token);


    return this.http.post('https://training-management-app.herokuapp.com/superAdmin/registerEmployees',data,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
  })
  
  

  }
}
