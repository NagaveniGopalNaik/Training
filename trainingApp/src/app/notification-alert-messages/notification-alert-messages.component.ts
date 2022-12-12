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
  constructor(private router:Router,private superAdmin:SuperAdminService,private adminService:AdminServiceService) { }

  ngOnInit(): void {
    this.getNotificationMsg();

  }

  getNotificationMsg(){
    this.superAdmin.notification().subscribe((data)=>{
      console.log(data);
      let getData = data
       if(getData[0] == '{'){
          getData = JSON.parse(getData);
          let key = Number(Object.keys(getData));
          this.notificationList = getData[key] || [];
          // sessionStorage.setItem('notification_details',JSON.stringify(this.notificationList));
        }
        for(let notification of this.notificationList){
          
          
          
          
          
          this.adminService.courseDetailsFn(notification.courseId).subscribe((data)=>{
            console.log(data);
            
          let details = data;
          if(details[0] == '{'){
            details = JSON.parse(details);
          //  if(details['meetingInfo'] != null){
          //   details['meetingInfo'] = JSON.parse(details['meetingInfo']) || {};
          //  }
            
            
            this.notificationDetails.push(details);
            console.log(this.notificationDetails);
            // if(details.meetingInfo != null){
            //   details.meetingInfo = JSON.parse(details.meetingInfo);
            // }
            
          } else{
            alert(data);
          }
          })
        }
        

      
    },(error)=>{
      alert(error.error);
    })
  }
  reject_reason(){
this.router.navigate(['/reject-reason']);
  }

  accept(data:any){
    let object = this.notificationList.find((notification)=>{
      return notification.courseId == data.courseId;
    })
    if(object != null){
      let index = this.notificationList.indexOf(object);
      let notificationId = this.notificationList[index].inviteId;
      console.log(notificationId);
      
    }
  }
}
