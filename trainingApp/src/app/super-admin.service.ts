import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EnvironmentInjector, Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const API_URL = environment.API_URL;
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


    return this.http.post(`${API_URL}/superAdmin/registerEmployees`,data,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
  })
  
  

  }

  changeRole(data:any):Observable<any>{
    
    return this.http.put(`${API_URL}/superAdmin/changeRole`,data,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
  })
  }


  deleteEmployee(data:any):Observable<any>{
    let deletedData = data[0].empId;
    console.log(deletedData);
    sessionStorage.setItem('deletedData',JSON.stringify(deletedData));
    return this.http.put(`${API_URL}/superAdmin/delete/employees`,data,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
  })
  }


  

  courseDetails():Observable<any>{
    this.course =this.course + 1;
    return this.http.get(`${API_URL}/company/courses/completed`,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),observe:'body',params:new HttpParams().set('page',this.course).set('limit',10)
    ,responseType:'text'
  });
  }
 
  

  AllEmployeeDetails():Observable<any>{
    let page = JSON.parse(sessionStorage.getItem('page')|| '0') ;
    page = page + 1;
    sessionStorage.setItem('page',page);
    return this.http.get(`${API_URL}/employees`,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),observe:'body',params:new HttpParams().set('page',page).set('limit',10)
    ,responseType:'text'
  });

  
  }

  searchData(data:any){
    let filter = JSON.parse(sessionStorage.getItem('filter')|| '1') ;
    sessionStorage.setItem('filter',JSON.stringify(filter));
 console.log(filter);
 
    return this.http.get(`${API_URL}/employees/search`,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),observe:'body',params:new HttpParams().set('searchKey',data).set('page',filter).set('limit',10)
    ,responseType:'text'
  })
  }

  getCourseAcceptCount(data:any){
    return this.http.get(`${API_URL}/employee/count/acceptedInvites/${data}`,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),observe:'body',responseType:'text'
  });
  }

}
