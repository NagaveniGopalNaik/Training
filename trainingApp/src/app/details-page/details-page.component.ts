import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProfileComponent } from '../add-profile/add-profile.component';
import { AdminServiceService } from '../admin-service.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {
  courseDetails:any;
  details: any;
  display:any;
  attendees:any;
  attendeesData:any;
  nonAttendees:any;
  nonAttendeesData:any;
  completionStatus:any;
  constructor(private dialog:MatDialog,private adminService:AdminServiceService) { }
  displayCompleted=false;
  displayUpcoming=false;
  displayActive=false;
  coursedata:any;
  ngOnInit(): void {
    this.adminService.courseDetailsFn().subscribe(data=>{
      console.log(data);
      this.coursedata=data;
      this.coursedata = JSON.parse(this.coursedata);
      this.details=this.coursedata;
      console.log(this.details);

      this.courseDetails=sessionStorage.getItem('course_details');
      this.courseDetails=JSON.parse(this.courseDetails);
      this.completionStatus=this.courseDetails.completionStatus;
      console.log(this.completionStatus);
      
      if(this.completionStatus=='completed'){
        this.displayCompleted=true;
      }else if(this.completionStatus=='active'){
        this.displayActive=true;
      }else{
        this.displayUpcoming=true;
      }

      this.adminService.getAttendees().subscribe(data=>{
        console.log(data);
        this.attendeesData=data;
        this.attendeesData=JSON.parse(this.attendeesData);
        const arrayAttendees = Object.keys(this.attendeesData)[0];
        this.attendeesData=this.attendeesData[arrayAttendees]
        this.attendees=this.attendeesData;
        console.log(this.attendees);
        
      })

      this.adminService.getNonAttendees().subscribe(
        data=>{
          console.log(data);
          this.nonAttendeesData=data;
          this.nonAttendeesData=JSON.parse(this.nonAttendeesData);
          const arraynonAttendees = Object.keys(this.nonAttendeesData)[0];
          this.nonAttendeesData=this.nonAttendeesData[arraynonAttendees]
          this.nonAttendees=this.nonAttendeesData;
          console.log(this.nonAttendees);
          
        }
      )
     
    })

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
  
}
