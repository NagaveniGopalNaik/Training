import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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
  courseDetails:any;
  details_id:any;
  detailsURL=`${API_URL}/employee/courseDetails/`;
  getEmpToInviteUrl=`${API_URL}/employeesToInvite/`;
  inviteEmpUrl=`${API_URL}/invite/`;
  deleteInviteEmpUrl=`${API_URL}/deleteInvite/`
  attendeesURL=`${API_URL}/attendees/`;
  nonAttendeesURL=`${API_URL}/nonAttendees/`;
  data='active';
  token = JSON.parse(sessionStorage.getItem('token') as any);

  getDetailsId(){
    this.courseDetails=sessionStorage.getItem('course_details');
    this.courseDetails=JSON.parse(this.courseDetails);
    this.details_id = this.courseDetails.courseId;
    
    // this.completionStatus=this.courseDetails.completionStatus;
    // if(this.completionStatus=='completed'){
    //   this.display=true;
    // }
  }
  
 
  
  constructor(private httpClient: HttpClient) { }
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

  // showActiveCourses(){
  //   this.course=this.course+1; 
  //   return this.httpClient.get(this.url+'active', {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),params:new HttpParams().set('page',this.course).set('limit',10)
  //   ,responseType:'text'
  //   });
  // }
  // showUpcomingCourses(){
  //   this.course=this.course+1; 
  //   return this.httpClient.get(this.url+'upcoming', {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),params:new HttpParams().set('page',this.course).set('limit',10)
  //   ,responseType:'text'
  //   });
  // }
  // showCompletedCourses(){
  //   this.course=this.course+1; 
  //   return this.httpClient.get(this.url+'completed', {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),params:new HttpParams().set('page',this.course).set('limit',10)
  //   ,responseType:'text'
  //   });
  // }
  courseDetailsFn(){
    this.getDetailsId();
    console.log(this.details_id);
    
    return this.httpClient.get(this.detailsURL+this.details_id,{headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),
    responseType:'text'
    })
  }
  getAttendees(){
    this.getDetailsId();
    console.log(this.details_id);
    this.attendees=this.attendees+1;
    return this.httpClient.get(this.attendeesURL+this.details_id,
      {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),
      params:new HttpParams().set('page',this.attendees).set('limit',10),
    responseType:'text'});
  }
  getNonAttendees(){
    this.getDetailsId();
    console.log(this.details_id);
    this.nonAttendees=this.nonAttendees+1;
    return this.httpClient.get(this.nonAttendeesURL+this.details_id,{headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),params:new HttpParams().set('page',this.attendees).set('limit',10),
    responseType:'text'});
  }
  
 
  updateEvent(){
    return this.httpClient.patch(`${API_URL}/admin/update/course`,

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
    console.log(body);
    return this.httpClient.put(this.deleteInviteEmpUrl+this.details_id,
      body,
       {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token)
  
      });
  }
  deleteEmployees(body:any){
      return this.httpClient.post(this.inviteEmpUrl+this.details_id,
        body,
         {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token)
    
        });
  }
}
