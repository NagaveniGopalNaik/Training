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
token :any;
courseUrl:any;
loginRole:any;
loginData:any;


  constructor(private http:HttpClient) { }


  getToken(){
    this.token = JSON.parse(sessionStorage.getItem('token') as any);
  }
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

  getCourseUpdates(){
    this.getLoginRole();
    if(this.loginRole == 'employee'){
      this.courseUrl = '/employee/acceptedCourses/filter/';
    } else if(this.loginRole == 'manager'){
      this.courseUrl = '/manager/assignedCourses/'
    }else{
      this.courseUrl = '/company/courses/'
    }

  }
  

  courseDetails():Observable<any>{
    let page = sessionStorage.getItem('course-page') || '1';
    let activeTag =sessionStorage.getItem('active');
    console.log(this.course);
    this.getCourseUpdates();
    this.getToken();
    return this.http.get(`${API_URL}${this.courseUrl}${activeTag}`,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),observe:'body',params:new HttpParams().set('page',page).set('limit',10)
    ,responseType:'text'
  });
  }
 
  

  AllEmployeeDetails():Observable<any>{
    this.getToken();
    let page = JSON.parse(sessionStorage.getItem('page')|| '0') ;
    page = page + 1;
    sessionStorage.setItem('page',page);
    return this.http.get(`${API_URL}/employees`,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),observe:'body',params:new HttpParams().set('page',page).set('limit',10)
    ,responseType:'text'
  });

  
  }

  searchData(data:any){
    this.getToken();
    let filter = JSON.parse(sessionStorage.getItem('filter')|| '1') ;
    sessionStorage.setItem('filter',JSON.stringify(filter));
 console.log(filter);
 
    return this.http.get(`${API_URL}/employees/search`,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),observe:'body',params:new HttpParams().set('searchKey',data).set('page',filter).set('limit',10)
    ,responseType:'text'
  })
  }

  getCourseAcceptCount(data:any){
    this.getToken();
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
    this.getToken();
    let active = sessionStorage.getItem('employee-nav') || 'attendedCourse';
    return this.http.get(`${API_URL}/employee/${active}`,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),observe:'body',params:new HttpParams().set('page',1).set('limit',10),responseType:'text'
  });
  }

  notification(){
    this.getToken();
    return this.http.get(`${API_URL}/employee/invites`,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),observe:'body',params:new HttpParams().set('page',1).set('limit',10),responseType:'text'
  });
  }

  notificationList(){
    this.getToken();
    return this.http.get(`${API_URL}/employee/notifications`,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),observe:'body',params:new HttpParams().set('page',1).set('limit',10),responseType:'text'
  });
  }

  notificationCount(){
    sessionStorage.setItem('changeEmployeeRole','false');
    return this.http.get(`${API_URL}/employee/notification/count`,
    // return this.http.get(`${API_URL}/employee/notifications`,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),observe:'body',responseType:'text'
  });
  }

  getLoginRole(){
    this.loginData = JSON.parse(sessionStorage.getItem('login') as any);
    this.loginRole = this.loginData['employee'].roles[0].roleName;
    // console.log(this.role);
  }

  // course count for Admin and super admin
getTrainingCountUrl(){
  this.getLoginRole();
  if(this.loginRole =='super_admin' || this.loginRole == 'admin'){
    this.appendingUrl = '/company/trainings/count/';
    
  } else if(this.loginRole=='employee'){
    
    this.appendingUrl = '/employee/course/count/';
    
  } else{
    this.appendingUrl = '/manager/assignedCourses/count/';
    
    

  }
 
  
}

  activeCount(){
    
    this.getToken();
    
    this.getTrainingCountUrl();
    // console.log(this.loginRole);
    
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

//   acceptInvite(data:any){
//     console.log(data);
    
// this.getToken();
// console.log(this.token);

// return this.http.put(`${API_URL}/employee/acceptInvite/${String(data)}`,
// {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
// })
//   }

  acceptInvite(data:any):Observable<any>{
    console.log(this.token);
    
    return this.http.put(`${API_URL}/employee/acceptInvite/${String(data)}`,data,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
  })
  }

  rejectInvite(data:any):Observable<any>{
    let invites = JSON.parse(sessionStorage.getItem('invites-details') as any);
    let inviteId=invites.inviteId;

    
    return this.http.put(`${API_URL}/employee/rejectInvite/${inviteId}`,data,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
  })
  }

  notificationCountUpdate(){
    let invites = JSON.parse(sessionStorage.getItem('invites-details') as any);
    let inviteId=invites.inviteId;

    return this.http.put(`${API_URL}/employee/reduceNotificationCount/${inviteId}`,inviteId,
        {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
     })
  }

  notificationAlert(){
    this.getToken();
    
    this.getTrainingCountUrl();
    // console.log(this.loginRole);
    
    return this.http.get(`${API_URL}/employee/clearNotification`,
        {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
     })
  }

  clearNotification(){
    return this.http.put(`${API_URL}/employee/clearNotification`,'data',
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
 })
  }
 

}
