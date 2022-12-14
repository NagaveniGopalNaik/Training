import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuperAdminService } from '../super-admin.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
notificationList:any[]=[];
key:any;
  constructor(private superAdmin:SuperAdminService,private router:Router) { }

  ngOnInit(): void {
    this.superAdmin.notificationList().subscribe({
      next:(data)=>{
        console.log(data);
        if(data[0]=='{'){
          this.notificationList = JSON.parse(data as any);
          this.key = Object.keys(this.notificationList)[0];
          this.notificationList = this.notificationList[this.key];
          console.log(this.notificationList);
          
        } else {
          this.notificationList = [];
          this.key = 0;
        }
        
      }
    })
  }

  viewDetails(invite){
    
    let data = this.notificationList.find((eachData)=>{
      return invite.courseId == eachData.courseId;
    })
  
    
    sessionStorage.setItem('invites-details',JSON.stringify(data));
    this.superAdmin.notificationCountUpdate().subscribe({
      complete:()=>{
        this.router.navigate(['/notifications']);
      }
    });
    
    
  }

  clearNotification(){
   
    this.superAdmin.clearNotification().subscribe({
      complete:()=>{
        sessionStorage.setItem('notificationUpdate','true');
      }
    })
  }


}
