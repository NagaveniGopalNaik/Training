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
course = 1;
employee = 0;
appendingUrl:any;
token = JSON.parse(sessionStorage.getItem('token') as any);
// appendingUrlCompany:any='/company/trainings/count/';
// appendingUrlEmployee:any='/employee/employee/course/count/';
// appendingUrlManager:any='/manager/assignedCourses/count/';
// employeeId:any;
loginRole:any;


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
    let page = sessionStorage.getItem('course-page') || '1';
    let activeTag =sessionStorage.getItem('active');
    console.log(this.course);
    
    
    return this.http.get(`${API_URL}/company/courses/${activeTag}`,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),observe:'body',params:new HttpParams().set('page',page).set('limit',10)
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

  filterCourse(data:any){
    let activeData = sessionStorage.getItem('active') as any;
    console.log(activeData);
    
    sessionStorage.setItem('filterCourse','true');
    return this.http.get(`${API_URL}/course/filter`,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),observe:'body',params:new HttpParams().set('completionStatus',activeData).set('downDate',data.downDate).set('topDate',data.topDate).set('page',1).set('limit',10),responseType:'text'
  });
  }

  imageUpload(data:any){
    console.log(data);
    let formData = new FormData();
    formData.set('file',data);
    
    return this.http.put(`${API_URL}/employee/uploadProfilePhoto`,formData,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
  })
  }

  getAttendedCourse(){
    let active = sessionStorage.getItem('employee-nav') || 'attendedCourse';
    return this.http.get(`${API_URL}/employee/${active}`,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),observe:'body',params:new HttpParams().set('page',1).set('limit',10),responseType:'text'
  });
  }

  notificationCount(){
    sessionStorage.setItem('changeEmployeeRole','false');
    return this.http.get(`${API_URL}/employee/notification/count`,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),observe:'body',responseType:'text'
  });
  }

  getLoginRole(){
    let loginData = JSON.parse(sessionStorage.getItem('login') as any);
    this.loginRole = loginData['employee'].roles[0].roleName;
    // console.log(this.role);
  }

  // course count for Admin and super admin
getTrainingCountUrl(){
  this.getLoginRole();
 
  
  if(this.loginRole =='super_admin' || this.loginRole == 'admin'){
    this.appendingUrl = '/company/trainings/count/';
    sessionStorage.setItem('changeEmployeeRole','false');
  } else if(this.loginRole=='employee'){
    
    this.appendingUrl = '/employee/course/count/';
    sessionStorage.setItem('changeEmployeeRole','false');
  } else{
    this.appendingUrl = '/manager/assignedCourses/count/';
    sessionStorage.setItem('changeEmployeeRole','false');

  }
  
}
  activeCount(){
    this.token = JSON.parse(sessionStorage.getItem('token') as any);
    
    
    this.getTrainingCountUrl();
    return this.http.get(`${API_URL}`+this.appendingUrl+'active',
        {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
     })
    
  }
  upcomingCount(){
      this.getTrainingCountUrl();
    return this.http.get(`${API_URL}${this.appendingUrl}upcoming`,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
 })
  }
  completedCount(){
    this.getTrainingCountUrl();
    return this.http.get(`${API_URL}${this.appendingUrl}completed`,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
 })
  }

}
