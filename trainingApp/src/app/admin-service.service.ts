import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SuperAdminService } from './super-admin.service';
const API_URL=environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  course=0;
  attendees=0;
  employees=0;
  completionStatus:any;
  nonAttendees:any;
  display:any;
  activeTag:any;
  trainingCountUrl=`${API_URL}/company/trainings/count/`
  url=`${API_URL}/company/courses/`;
  ManagerUrl=`${API_URL}`
  courseDetails:any;
  details_id:any;
  detailsURL=`${API_URL}/employee/courseDetails/`;
  getEmpToInviteUrl=`${API_URL}/employeesToInvite/`;
  inviteEmpUrl=`${API_URL}/invite/`;
  deleteInviteEmpUrl=`${API_URL}/deleteInvite/`
  attendeesURL=`${API_URL}/attendees/`;
  nonAttendeesURL=`${API_URL}/nonAttendees/`;
  deleteCourseURL=`${API_URL}/admin/delete/course/`
  data='active';
  token = JSON.parse(sessionStorage.getItem('token') as any);
  deleteCourseArray:any;

  getDetailsId(){
    this.courseDetails=sessionStorage.getItem('course_details');
    
    
    // this.deleteCourseArray=sessionStorage.getItem(JSON.parse('deleteCourseArray'));
    this.courseDetails=JSON.parse(this.courseDetails);
    this.details_id = this.courseDetails.courseId;
    
  }
  
 
  
  constructor(private httpClient: HttpClient,private superAdmin:SuperAdminService) { }
  createEvent(body:any){
    console.log(body);
    
    return this.httpClient.post(`${API_URL}/admin/createCourse`,
    body,
     {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token)

    });
  }

  activeCount(){
    return this.httpClient.get(this.trainingCountUrl+'active',
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
 })
  }
  upcomingCount(){
    return this.httpClient.get(this.trainingCountUrl+'upcoming',
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
 })
  }
  completedCount(){
    return this.httpClient.get(this.trainingCountUrl+'completed',
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
 })
  }
  
  showCourses(){

    this.course=this.course+1; 
    this.activeTag=sessionStorage.getItem('active');
    // console.log(typeof this.activeTag);
    // return this.httpClient.get(this.url+`${this.data}`, {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),params:new HttpParams().set('page',1).set('limit',10)
    //   ,responseType:'text'
    // });
    if(this.activeTag=='active'){
      return this.httpClient.get(this.url+'active', {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),params:new HttpParams().set('page',this.course).set('limit',10)
      ,responseType:'text'
    });
    }else if(this.activeTag=='upcoming'){
      return this.httpClient.get(this.url+'upcoming', {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),params:new HttpParams().set('page',this.course).set('limit',10)
      ,responseType:'text'
    });
    }else{
      return this.httpClient.get(this.url+'completed', {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),params:new HttpParams().set('page',this.course).set('limit',10)
      ,responseType:'text'
    });
    
    }
  }
  showCoursesToManager(){
    this.course=this.course+1; 
    this.activeTag=sessionStorage.getItem('active');
    // console.log(typeof this.activeTag);
    // return this.httpClient.get(this.url+`${this.data}`, {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),params:new HttpParams().set('page',1).set('limit',10)
    //   ,responseType:'text'
    // });
    if(this.activeTag=='active'){
      return this.httpClient.get(this.ManagerUrl+'active', {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),params:new HttpParams().set('page',this.course).set('limit',10)
      ,responseType:'text'
    });
    }else if(this.activeTag=='upcoming'){
      return this.httpClient.get(this.ManagerUrl+'upcoming', {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),params:new HttpParams().set('page',this.course).set('limit',10)
      ,responseType:'text'
    });
    }else{
      return this.httpClient.get(this.ManagerUrl+'completed', {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),params:new HttpParams().set('page',this.course).set('limit',10)
      ,responseType:'text'
    });
    
    }
  }

  
  courseDetailsFn(data:any){
    this.superAdmin.getToken();
    // this.getDetailsId();
    // console.log(this.details_id);
    
    return this.httpClient.get(this.detailsURL+data,{headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),
    responseType:'text'
    })
  }
  getAttendees(){
    this.superAdmin.getToken();
    this.token = this.superAdmin.token;
   console.log(this.token);
   
    
    this.getDetailsId();
  
    // this.attendees=this.attendees+1;
    return this.httpClient.get(this.attendeesURL+this.details_id,
      {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),
      params:new HttpParams().set('page',1).set('limit',10),
    responseType:'text'});
  }
  getNonAttendees(){
    this.getDetailsId();
    console.log(this.details_id);
    this.nonAttendees=this.nonAttendees+1;
    return this.httpClient.get(this.nonAttendeesURL+this.details_id,{headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),params:new HttpParams().set('page',1).set('limit',10),
    responseType:'text'});
  }
  
 
  updateEvent(body:any){
    return this.httpClient.put(`${API_URL}/admin/update/course`,body,

    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'

  });
  }

  getEmployeesToInvite(){
    this.getDetailsId();
    this.employees=this.employees+1;
    return this.httpClient.get(this.getEmpToInviteUrl+this.details_id,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),
    params:new HttpParams().set('page',this.attendees).set('limit',10),
  responseType:'text'});
  }
  inviteEmployees(body:any){
    this.superAdmin.getToken();
    this.token = this.superAdmin.token;
    console.log(this.token);
    
    return this.httpClient.put(this.deleteInviteEmpUrl+this.details_id,
      body,
       {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
  
      });
  }
  deleteEmployees(body:any){
    this.superAdmin.getToken();
    this.token = this.superAdmin.token;
      return this.httpClient.post(this.inviteEmpUrl+this.details_id,
        body,
         {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
    
        });
  }
deleteCourse(body:any){
  this.superAdmin.getToken();
  this.token = this.superAdmin.token;
  this.superAdmin.getToken();
    this.token = this.superAdmin.token;
  return this.httpClient.delete(`${API_URL}/admin/delete/course/${body}`,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
    
  }
    )
}

getManagertoCourse(id:any){
  this.superAdmin.getToken();
  this.token = this.superAdmin.token;
 
    this.employees=this.employees+1;
    return this.httpClient.get(`${API_URL}/admin/managersToAssignCourse/${id}`,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),
    params:new HttpParams().set('page',1).set('limit',10),
  responseType:'text'});
}

assignManager(body:any){
  this.superAdmin.getToken();
    this.token = this.superAdmin.token;
    let course = JSON.parse(sessionStorage.getItem('asign-manager-course') as any);
    let courseId = course.courseId;
      return this.httpClient.post(`${API_URL}/admin/assignCourseToManager/${courseId}`,
        body,
         {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
    
        });
}

deleteManager(data:any){
  console.log(data);
  
  this.superAdmin.getToken();
    this.token = this.superAdmin.token;
    let course = JSON.parse(sessionStorage.getItem('asign-manager-course') as any);
    let courseId = course.courseId;
      return this.httpClient.put(`${API_URL}/admin/unassignCourseFromManager/${courseId}`,
        data,
         {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
    
        });
}

searchManager(data:any){
  this.superAdmin.getToken();
  this.token = this.superAdmin.token;
  let course = JSON.parse(sessionStorage.getItem('asign-manager-course') as any);
    let courseId = course.courseId;
    return this.httpClient.get(`${API_URL}/admin/managersToAssignCourse/searchKey/${courseId}`,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),
    params:new HttpParams().set('searchKey',data),
  responseType:'text'});
}

searchReportees(data:any){
  this.superAdmin.getToken();
  this.token = this.superAdmin.token;
  let managerData = JSON.parse(sessionStorage.getItem('managerData') as any);
  let managerId = managerData.empId;
  
    return this.httpClient.get(`${API_URL}/admin/employeesToAssignManager/search/${managerId}`,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),
    params:new HttpParams().set('searchKey',data),
  responseType:'text'});
}

searchInvitees(data:any){
  this.superAdmin.getToken();
  this.token = this.superAdmin.token;
  this.getDetailsId();
  console.log(this.details_id);
  
    return this.httpClient.get(`${API_URL}/employees/search/${this.details_id}`,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),
    params:new HttpParams().set('searchKey',data),
  responseType:'text'});
}
///employees/search


getAttendeesCount(){
  this.getDetailsId();
  console.log(this.details_id);
 
  this.superAdmin.getToken();
  this.token = this.superAdmin.token;
  return this.httpClient.get(`${API_URL}/attendees_nonAttendees_count/${this.details_id}`,
  {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token)
  ,responseType:'text'
})
}  


getEmployeeList(){
  this.superAdmin.getToken();
  this.token = this.superAdmin.token;
  let managerData = JSON.parse(sessionStorage.getItem('managerData') as any);
  let managerId = managerData.empId;
  
  
    
    return this.httpClient.get(`${API_URL}/admin/employeesToAssignManager/${managerId}`,
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),
    params:new HttpParams().set('page',1).set('limit',10),
  responseType:'text'});
}

addReportees(data:any){
  this.superAdmin.getToken();
    this.token = this.superAdmin.token;
    
    
    return this.httpClient.put(`${API_URL}/admin/assignManager/employees`,
      data,
       {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
  
      });
}

removeReportees(data:any){
  this.superAdmin.getToken();
    this.token = this.superAdmin.token;
    
    
    return this.httpClient.put(`${API_URL}/admin/delete/reportees`,
      data,
       {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'
  
      });
}
}


// /admin/assignManager/employees