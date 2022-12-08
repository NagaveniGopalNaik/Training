import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
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
loginData:any;
notificationCount:any;
  constructor(private router:Router, private dialog:MatDialog,private superAdmin:SuperAdminService) { }

  ngOnInit(): void {
  this.alertMsg();
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
    this.loginData = this.loginData['employee'].profilePic;
  }
  notification(){
    if(Number(this.notificationCount)>0){
      this.router.navigate(['/notifications'])
    }

  }

  back(){
this.router.navigate(['/employee']);
  }

  displayOption(){
    this.hiddenOption=true;
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

  
}
