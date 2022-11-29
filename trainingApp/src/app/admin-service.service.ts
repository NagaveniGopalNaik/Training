import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  token = JSON.parse(sessionStorage.getItem('token') as any);
  constructor(private httpClient: HttpClient) { }
  createEvent(body:any){
    console.log(body);
    
    return this.httpClient.post('https://training-management-app.herokuapp.com/admin/createCourse',
    body,
     {headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text'

    });
  }
}
