import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { EmployeeRegisterComponent } from '../employee-register/employee-register.component';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { SuperAdminService } from '../super-admin.service';
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
  let value = JSON.parse(sessionStorage.getItem('login') as any);
  this.loginRole =value['employee'].roles[0].roleName;
  
  
 
  

  }

  alertMsg(){
    
      this.superAdmin.notificationCount().subscribe(data=>{
        this.notificationCount = data;
        if(Number(this.notificationCount)<1){
          this.hidden = true;
        }
      },(error)=>{
        alert(error.error);
      })
    
  }
  getProfile(){
    this.loginData = JSON.parse(sessionStorage.getItem('login') as any);
    this.profile = (this.loginData['employee'].profilePic || '/assets/profile.png');
    this.role = this.loginData['employee'].roles[0].roleName;
    let change = sessionStorage.getItem('changeEmployeeRole') || 'true';
    if(change == 'true'){
      this.alertMsg();
    }
    
    // if(this.loginRole =='employee'){
    //   this.alertMsg();
    //  }
    
  }
  notification(){
    if(Number(this.notificationCount)>0){
      this.router.navigate(['/notifications'])
    }

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
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('login');
    this.router.navigate(['/login']);
  }

  addNewEmployee(){
    this.hiddenOption1 = !this.hiddenOption1;
    
  }
  register(){
    this.hiddenOption = false;
    this.dialog.open(EmployeeRegisterComponent,{panelClass: 'employee-register'});
  }
  delete(){
    this.hiddenOption = false;
    this.router.navigate(['/delete-multi-employee'])
   
  }
  roleChange(){
    if(this.loginRole !='super_admin'){
      sessionStorage.setItem('previousRole',this.role);
    this.loginState=!this.loginState;
    let role:any;
    if(this.loginState == true){
      role = 'employee';
    } else {
      role = this.loginRole;
      console.log(role);
      
      
    }
    
    this.loginData['employee'].roles[0].roleName = role;
    
    sessionStorage.setItem('changeEmployeeRole','true');
    sessionStorage.setItem('login',JSON.stringify(this.loginData));


    }
  }

  
}
