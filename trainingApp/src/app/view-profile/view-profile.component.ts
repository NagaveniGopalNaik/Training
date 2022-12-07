import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuperAdminService } from '../super-admin.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
loginData:any;
  constructor(private router:Router,private superAdmin:SuperAdminService) { }
attendedData=true;
nonAttendedData=false;
courseDetails:any;
  ngOnInit(): void {
    this.getCourseDetails();
  }
  notification(){
    this.router.navigate(['/notifications'])
      }

      getProfile(){
        this.loginData = JSON.parse(sessionStorage.getItem('login') as any);
        this.loginData = this.loginData['employee'];
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
          this.courseDetails = JSON.parse(data);
          let key = Object.keys(this.courseDetails)[0];
          this.courseDetails = this.courseDetails[key];

          
        },(error)=>{
          alert(error.error);
        })
      }
}
