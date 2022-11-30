import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {
course=0;
employee = 0;

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

  changeRole(data:any):Observable<any>{
    
    return this.http.put('https://training-management-app.herokuapp.com/superAdmin/changeRole',data,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
  })
  }


  deleteEmployee(data:any):Observable<any>{
    
    return this.http.put('https://training-management-app.herokuapp.com/superAdmin/delete/employees',data,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
  })
  }


  

  courseDetails():Observable<any>{
    this.course =this.course + 1;
    return this.http.get('https://training-management-app.herokuapp.com/company/courses/completed',
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),observe:'body',params:new HttpParams().set('page',this.course).set('limit',10)
    ,responseType:'text'
  });
  }

  AllEmployeeDetails():Observable<any>{
    let page = JSON.parse(sessionStorage.getItem('page')|| '0') ;
    page = page +1;
    sessionStorage.setItem('page',page);
    return this.http.get('http://coursemanagement-env.eba-tkaxmz2r.ap-south-1.elasticbeanstalk.com/employees',
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),observe:'body',params:new HttpParams().set('page',page).set('limit',10)
    ,responseType:'text'
  });

  
  }

}
