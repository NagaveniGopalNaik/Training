import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  course=0;
  token = JSON.parse(sessionStorage.getItem('token') as any);
  constructor(private httpClient: HttpClient) { }
  createEvent(body:any){
    console.log(body);
    
    return this.httpClient.post('https://training-management-app.herokuapp.com/admin/createCourse',
    body,
     {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token)

    });
  }

  trainingCount(){
    return this.httpClient.get('https://training-management-app.herokuapp.com/company/trainings/count/upcoming',
    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'

  })
  }
  
  showCourses(){
    
    this.course=this.course+1; 
    
    return  this.httpClient.get('https://training-management-app.herokuapp.com/company/courses/completed',

    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),params:new HttpParams().set('page',this.course).set('limit',10)
    ,responseType:'text'

  });
  }
 
  updateEvent(){
    return this.httpClient.patch('https://training-management-app.herokuapp.com/admin/update/course',

    {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'

  });
  }
}
