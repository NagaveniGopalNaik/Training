import { Component, OnInit, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddProfileComponent } from '../add-profile/add-profile.component';
import { AdminServiceService } from '../admin-service.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  display = false;
  displayEditDlt = false;
  body: any;
  activeCourseDetails: any;
  upcomingCourseDetails:any;
  completedCourseDetails:any;
  active_ends_in=false;
  upcoming_starts_in=false;
  no_comment=true;
  course_status:any;
  courseId:any;
  tag=sessionStorage.getItem('active');
  courseDetails: any;
  course_status_active='course_status_active';
  course_status_upcoming='course_status_upcoming';
  course_status_completed='course_status_completed';
  disedit:any;
  course_list:any;
  constructor(private dialog: MatDialog, private adminService: AdminServiceService,private router:Router) { }
  // this.tag=sessionStorage.getItem('active');
  ngOnInit(): void {
      this.adminService.showCourses().subscribe(data => {
        console.log(data);
        this.courseDetails = JSON.parse(data);
        
      
        const arrayCourseDetails = Object.keys(this.courseDetails)[0];
        this.courseDetails = this.courseDetails[arrayCourseDetails]
        console.log(this.courseDetails);
        for(let show of this.courseDetails){
          show.block=false;
        }
        console.log(this.courseDetails);

        console.log(this.courseDetails[0].completionStatus);
        
        if(this.courseDetails[0].completionStatus=='active'){
          this.active_ends_in=true;
          this.course_status= this.course_status_active;
        }else if(this.courseDetails[0].completionStatus=='upcoming'){
          this.upcoming_starts_in=true;
          this.course_status= this.course_status_upcoming;
        }if(this.courseDetails[0].completionStatus=='completed'){
          this.active_ends_in=false;
          this.upcoming_starts_in=false;
          this.course_status= this.course_status_completed;
        }
      
      })
    
    



  //   if(this.tag=='active'){
  //     this.adminService.showActiveCourses().subscribe(data=>{
  //       console.log(data);
  //       this.activeCourseDetails = JSON.parse(data);

  //     const arrayactiveCourseDetails = Object.keys(this.activeCourseDetails)[0];
  //      this.activeCourseDetails = this.activeCourseDetails[arrayactiveCourseDetails]
  //     console.log(this.activeCourseDetails);

        
  //     })
  //   }else if(this.tag=='upcoming'){
  //     this.adminService.showUpcomingCourses().subscribe(data=>{
  //       console.log(data);
  //       this.upcomingCourseDetails = JSON.parse(data);

  //     const arrayupcomingCourseDetails = Object.keys(this.upcomingCourseDetails)[0];
  //      this.upcomingCourseDetails = this.upcomingCourseDetails[arrayupcomingCourseDetails]
  //     console.log(this.upcomingCourseDetails);
  //   })
  // }else{
  //   this.adminService.showCompletedCourses().subscribe(data=>{
  //     console.log(data);
  //     this.completedCourseDetails = JSON.parse(data);

  //   const arraycompletedCourseDetails = Object.keys(this.completedCourseDetails)[0];
  //    this.completedCourseDetails = this.completedCourseDetails[arraycompletedCourseDetails]
  //   console.log(this.completedCourseDetails);
  // })
  // }
}
// getCourse(){
//   if(sessionStorage.getItem('courseDetails')){
//     this.course_list = JSON.parse(sessionStorage.getItem('courseDetails') || '[]');
//   }
// }

navigateToDetails(data:any){
  sessionStorage.setItem('course_details',JSON.stringify(data));
  console.log(data);
  this.router.navigate(['/detailsPage']);
  
  // this.router.navigate(['/updateTraining']);
}

  display_p_options() {
    this.display = true;
  }
  addProfile() {
    this.dialog.open(AddProfileComponent, { height: '40%', width: '40%' });
  }
  editProfile() {
    this.dialog.open(EditProfileComponent, { height: '40%', width: '40%' });
  }
  display_edit_dlt_options(data:any) {
    // data.block='true';
    console.log(data);
    data.block = true;
    
    // this.disedit='true';
  }
  getUpdateTraining() {

  }

}
