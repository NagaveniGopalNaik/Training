import { Component, OnInit } from '@angular/core';
import { MatDialog, throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { EmployeeRegisterComponent } from '../employee-register/employee-register.component';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { SuperAdminService } from '../super-admin.service';
import { NotificationListComponent } from '../notification-list/notification-list.component';
@Component({
  selector: 'app-employee-header',
  templateUrl: './employee-header.component.html',
  styleUrls: ['./employee-header.component.css']
})
export class EmployeeHeaderComponent implements OnInit {
hidden=false;
hiddenOption=false;
hiddenOption1=false;
loginData:any;
profile:any;
notificationCount:any;
role:any;
loginState=false;
loginRole:any;
  constructor(private router:Router, private dialog:MatDialog,private superAdmin:SuperAdminService) { }

  ngOnInit(): void {
    sessionStorage.setItem('notificationUpdate','true');
  let value = JSON.parse(sessionStorage.getItem('login') as any);
  this.loginRole =value['employee'].roles[0].roleName;

    this.alertMsg();
  
  
 
  

  }

  alertMsg(){
    this.superAdmin.getLoginRole();
 this.role = this.superAdmin.loginRole;

 
 let notification = sessionStorage.getItem('notificationUpdate') || 'true';
    if((this.loginRole == 'employee' || this.role == 'employee') && notification == 'true'){
      
      
      
      
      
      this.superAdmin.notificationCount().subscribe(data=>{
        this.notificationCount = data;
       
        console.log(this.notificationCount);
        
        if(Number(this.notificationCount)<1){
          this.hidden = true;
        } else {
          this.hidden = false;
        }
      },(error)=>{
        // alert(error.error);
      })
      sessionStorage.setItem('notificationUpdate','false');
    }
      
    
  }
  getProfile(){
    this.loginData = JSON.parse(sessionStorage.getItem('login') as any);
    this.profile = (this.loginData['employee'].profilePic || '/assets/profile.png');
    this.role = this.loginData['employee'].roles[0].roleName;
    this.superAdmin.getLoginRole();
    
      this.alertMsg();
      if(this.router.url == '/notification'){
        this.hidden = true;
      }
    
   
   
    
  }
  notification(){
    
      
      
        this.dialog.open(NotificationListComponent,{panelClass:'notification-list'});
      
      this.alertMsg();
    

  }

  back(){
this.router.navigate(['/dashboard']);
  }

  displayOption(){
    this.hiddenOption=!this.hiddenOption;
  }

  addPhoto(){
    this.hiddenOption=false;
    this.dialog.open(ImageUploadComponent,{panelClass:'image-upload'})
  }
  viewProfile(){
    this.hiddenOption=false;
    this.router.navigate(['/profile']);
  }
  logout(){
    this.hiddenOption=false;
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  addNewEmployee(){
    this.hiddenOption1 = !this.hiddenOption1;
    
  }
  register(){
    this.hiddenOption1 = false;
    this.dialog.open(EmployeeRegisterComponent,{panelClass: 'employee-register'});
  }
  delete(){
    this.hiddenOption1 = false;
    this.router.navigate(['/delete-multi-employee'])
   
  }
  roleChange(){
   if(this.router.url != '/profile'){
    this.loginRole = JSON.parse(sessionStorage.getItem('previousRole') as any);
    if(this.loginRole !='super_admin'){
      // sessionStorage.setItem('previousRole',this.role);
    this.loginState=!this.loginState;
    let role:any;
    if(this.loginState == true){
      role = 'employee';
      console.log(role);
      sessionStorage.setItem('notificationUpdate','true');
      // sessionStorage.setItem('active','active');
    
      // sessionStorage.setItem('changeEmployeeRole','false');
    } else {
      role = this.loginRole;
      console.log(role);
      // sessionStorage.setItem('changeEmployeeRole','true');
      
    }
    
    this.loginData['employee'].roles[0].roleName = role;
    
    sessionStorage.setItem('changeEmployeeRole','false');
    sessionStorage.setItem('courseUpdate','true');
    
    sessionStorage.setItem('login',JSON.stringify(this.loginData));


    }
  }
   }

  
}
