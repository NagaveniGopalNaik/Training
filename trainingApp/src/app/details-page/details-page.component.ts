import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { AdminServiceService } from '../admin-service.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { SuperAdminService } from '../super-admin.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {
  courseDetails:any;
  details: any;
  display:any;
  attendees:any[]=[];
  attendeesData:any;
  nonAttendees:any;
  nonAttendeesData:any;
  completionStatus:any;
  blank='';
  attendeesCount:any;
  constructor(private dialog:MatDialog,private adminService:AdminServiceService,private router:Router,private superAdmin:SuperAdminService) { }
  displayCompleted=false;
  displayUpcoming=false;
  displayActive=false;
  coursedata:any;
  trainingMode:any;
   arrayAdd:any[]=[];
  allEmployee:any;
  attendeeCount:any;
  meetingInfo:any;
  ngOnInit(): void {
    this.courseDetail();
    this.getAttendees();
   
    
   
  }

  courseDetail(){
    this.adminService.getDetailsId();
    let courseId = this.adminService.details_id;
    this.adminService.courseDetailsFn(courseId).subscribe(data=>{
      console.log(data);
      this.coursedata=data;
      this.coursedata = JSON.parse(this.coursedata);
      this.details=this.coursedata;
      
      sessionStorage.setItem('course_details',JSON.stringify(this.details));
      sessionStorage.setItem('trainingMode',JSON.stringify(this.details.trainingMode));
      
      this.trainingMode=JSON.parse(sessionStorage.getItem('trainingMode')as any) ;
  
      this.courseDetails=sessionStorage.getItem('course_details');
      this.courseDetails=JSON.parse(this.courseDetails);
      this.completionStatus=this.courseDetails.completionStatus;
    
      this.superAdmin.getLoginRole();
      let role = this.superAdmin.loginRole;
      if(role == 'admin' || role == 'manager'){
        this.adminService.getNonAttendees().subscribe(
          data=>{
            console.log(data);
            this.nonAttendeesData=data;
            if(this.nonAttendeesData[0] == '{'){
              this.nonAttendeesData=JSON.parse(this.nonAttendeesData);
              const arraynonAttendees = Object.keys(this.nonAttendeesData)[0];
              this.nonAttendeesData=this.nonAttendeesData[arraynonAttendees]
              this.nonAttendees=this.nonAttendeesData;
              console.log(this.nonAttendees);
            } else {
              this.nonAttendees = [];
            }
          
            
          }
        )
      } else {
        this.nonAttendees = [];
      }
     

      
     
    })
  }
 
  getAtttendeesCount(){
    this.adminService.getAttendeesCount().subscribe(data=>{
      this.attendeesCount =data;
      this.attendeeCount=this.attendeesCount.slice(11,13);
    })
  }

  deleteEmployees(empId: any) {

    let result=confirm("Are you sure to delete invite?")

    if(result==false){

      this.router.navigate(['/detailsPage'])

    }

    else{

       this.arrayAdd.push(empId);

    this.adminService.inviteEmployees(this.arrayAdd).subscribe(data => {

      console.log(data);

      alert(data);

      this. getAttendees();

    })

    }

   

  }
  getAttendees(){
this.superAdmin.getLoginRole();
let role = this.superAdmin.loginRole;
  if(role == 'admin' || role == 'manager')
{ 
  this.adminService.getAttendees().subscribe(data=>{
    console.log(data);
    this.attendeesData=data;
    if(this.attendeesData[0] == '{'){ 
      this.attendeesData=JSON.parse(this.attendeesData);
    const arrayAttendees = Object.keys(this.attendeesData)[0];
    this.attendeesData=this.attendeesData[arrayAttendees]
    this.attendees=this.attendeesData;
    console.log(this.attendees);

    // sessionStorage.setItem('attendees',JSON.stringify(this.attendees));

    } else {
      this.attendees = [];
    }
    

    
  })
}  else {
  this.attendees =[];
}   
  }
  // display_p_options(){
  //   this.display=true;
  // }
  // addProfile(){
  //   this.dialog.open(AddProfileComponent,{height:'40%',width:'40%'});
  // }
  // editProfile(){
  //   this.dialog.open(EditProfileComponent,{height:'40%',width:'40%'});
  // }
  editTraining(){
    this.router.navigate(['/updateTraining']);
    
  }
  
}
