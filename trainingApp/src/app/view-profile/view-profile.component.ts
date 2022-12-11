import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SuperAdminService } from '../super-admin.service';
import { ProfileZoomComponent } from '../profile-zoom/profile-zoom.component';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
loginData:any;
  constructor(private router:Router,private superAdmin:SuperAdminService,private dialog:MatDialog) { }
attendedData=true;
nonAttendedData=false;
courseDetails:any;
profilePic:any;
  ngOnInit(): void {
    // sessionStorage.setItem('notificationUpdate','true');
    this.getCourseDetails();
  }
  notification(){
    this.router.navigate(['/notifications'])
      }

      getProfile(){
        this.loginData = JSON.parse(sessionStorage.getItem('login') as any);
        this.loginData = this.loginData['employee'];
        this.profilePic = this.loginData.profilePic || '/assets/profile.png';
      }
      attended(){
        this.attendedData = true;
        this.nonAttendedData = false;
        sessionStorage.setItem('employee-nav','attendedCourse');
        this.getCourseDetails();
      
      }
      nonAttended(){
        this.attendedData = false;
        this.nonAttendedData = true;
        sessionStorage.setItem('employee-nav','nonAttendedCourse');
        this.getCourseDetails();
        
      }

      getCourseDetails(){
        this.superAdmin.getAttendedCourse().subscribe(data=>{
          console.log(data);
          this.courseDetails = data;
          if(this.courseDetails[0] == '{'){
            this.courseDetails = JSON.parse(data);
            let key = Object.keys(this.courseDetails)[0];
            this.courseDetails = this.courseDetails[key];
          } else {
            this.courseDetails = [];
          }
        },(error)=>{
          alert(error.error);
        })
      }

      zoomImage(){
        this.dialog.open(ProfileZoomComponent,{panelClass:'profile-zoom'});
      }
}
