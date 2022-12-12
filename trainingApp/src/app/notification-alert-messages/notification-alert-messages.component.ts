import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from '../admin-service.service';
import { RejectReasonComponent } from '../reject-reason/reject-reason.component';
import { SuperAdminService } from '../super-admin.service';
@Component({
  selector: 'app-notification-alert-messages',
  templateUrl: './notification-alert-messages.component.html',
  styleUrls: ['./notification-alert-messages.component.css']
})
export class NotificationAlertMessagesComponent implements OnInit {
notificationList:any;
notificationDetails:any[]=[];
notification:any;
  constructor(private router:Router,private superAdmin:SuperAdminService,private adminService:AdminServiceService) { }

  ngOnInit(): void {
    
    this.getNotificationMsg();

  }

  getNotificationMsg(){
    this.notification = JSON.parse(sessionStorage.getItem('invites-details') as any);
    this.adminService.courseDetailsFn(this.notification.courseId).subscribe((data)=>{
      console.log(data);
      
    let details = data;
    if(details[0] == '{'){
      details = JSON.parse(details);
      
      this.notificationDetails.push(details);
      console.log(this.notificationDetails);
     
      
    } else{
      alert(data);
    }
    })
  }
  reject_reason(){
this.router.navigate(['/reject-reason']);
  }

  accept(data:any){
    
      this.superAdmin.acceptInvite(this.notification.inviteId).subscribe({
        next:(data)=>{
          alert(data);
          
         
        
  
        },
        error:(error)=>{
          alert(error.error)
        },
        complete : () =>{
          this.router.navigate(['/dashboard']);
        }
      })
      
    
  }
}
