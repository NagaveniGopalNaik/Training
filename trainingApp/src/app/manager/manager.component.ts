import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddProfileComponent } from '../add-profile/add-profile.component';
import { AdminServiceService } from '../admin-service.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  display=false
  courseDetails: any;
  active_ends_in=false;
  course_status: any;
  upcoming_starts_in=false;
  activeTag='active-tag';
  constructor(private dialog:MatDialog, private adminService:AdminServiceService,private router:Router) { }
  active=false;
  upcoming=false;
  completed=false;
  allEmployees=false;
  displayFilter=false;
  displayEditDlt=false;
  course_status_active='course_status_active';
  course_status_upcoming='course_status_upcoming';
  course_status_completed='course_status_completed'
  ngOnInit(): void {
    this.allCourses();
  }

  allCourses(){
    this.adminService.showCourses().subscribe(data => {
      console.log(data);
      this.courseDetails = JSON.parse(data);

      const arrayCourseDetails = Object.keys(this.courseDetails)[0];
      this.courseDetails = this.courseDetails[arrayCourseDetails]
      console.log(this.courseDetails);
      console.log(this.courseDetails[0].completionStatus);
      
      if(this.courseDetails[0].completionStatus=='active'){
        this.active_ends_in=true;
        this.course_status= this.course_status_active;

      }else if(this.courseDetails[0].completionStatus=='upcoming'){
        this.upcoming_starts_in=true;
        this.course_status= this.course_status_upcoming;

      }
      console.log(this.courseDetails[0].completionStatus);
      
      if(this.courseDetails[0].completionStatus=='completed') {
       console.log("uygvfuk");
       
        this.active_ends_in=false;
        this.upcoming_starts_in=false;
        this.course_status= this.course_status_completed;
      }

    })

  }
  getActive(){
    this.activeTag = sessionStorage.getItem('active') || 'active';
    switch(this.activeTag){
      case 'active':
        this.active = true;
       
        break;
        case 'upcoming':
        
        this.upcoming = true;
        
        break;
        case 'completed':
        
        this.completed = true;
        
        break;
        case 'allEmployees':
        
        this.allEmployees = true;
        break;
    }
  }
  activeFunction(){
    this.upcoming=false;
    this.completed=false;
    this.active=true;
    this.allEmployees=false;
    sessionStorage.setItem('active','active');
    // window.location.reload();
  }
  upcomingFunction(){
    this.upcoming=true;
    this.completed=false;
    this.active=false;
    this.allEmployees=false;
    sessionStorage.setItem('active','upcoming');
    // window.location.reload();
  }
  completeFunction(){
    this.upcoming=false;
    this.completed=true;
    this.active=false;
    this.allEmployees=false;
    sessionStorage.setItem('active','completed');
    // window.location.reload();
  }

  allEmployeeFunction(){
    this.upcoming=false;
    this.completed=false;
    this.active=false;
    this.allEmployees=true;
    sessionStorage.setItem('active','allEmployees');
  }
  filter(){
    this.displayFilter=true;
  }
  
  apply(){
    this.displayFilter = false;
  }
  
  navigateToDetails(data:any){
    sessionStorage.setItem('course_details',JSON.stringify(data));
    console.log(data);
    this.router.navigate(['/managerTrainingDetails']);
  }
  display_p_options(){
    this.display=true;
  }
  addProfile(){
    this.dialog.open(AddProfileComponent,{height:'40%',width:'40%'});
  }
  editProfile(){
    this.dialog.open(EditProfileComponent,{height:'40%',width:'40%'});
  }
  display_edit_dlt_options() {
    this.displayEditDlt = true;
  }

}
