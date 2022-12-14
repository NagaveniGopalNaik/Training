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
  nonAttendeesData:any[]=[];
  completionStatus:any;
  blank='';
  image="/assets/profile.png";
  role:any;
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
  nonAttendeeCount:any;
  meetingInfo:any;
  ngOnInit(): void {
    sessionStorage.removeItem('non-attend');
    sessionStorage.removeItem('attend');
    this.courseDetail();
    this.getAttendees();
    // this.getNonAttendees();   
    
   
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
      this.role = this.superAdmin.loginRole;
      this.getNonAttendees();
     

      
     
    })
  }
 getNonAttendees(){
  if(this.role == 'admin' || this.role == 'manager'){
    this.adminService.getNonAttendees().subscribe(
      {
        next:data=>{
          console.log(data);
          let datas = data;
          if(datas[0] == '{'){
            this.nonAttendeesData=JSON.parse(data);
            const arraynonAttendees = Object.keys(this.nonAttendeesData)[0];
            this.nonAttendeesData=this.nonAttendeesData[arraynonAttendees]
            this.nonAttendees=this.nonAttendeesData;
            console.log(this.nonAttendees);
           
          } else {
            this.nonAttendees = [];
          }
        
          
        },error:(error)=>{
          this.nonAttendees = [];
        }
      }
    )
  } else {
    this.nonAttendees = [];
  }
 }
  getAtttendeesCount(){
    this.adminService.getAttendeesCount().subscribe({
      next:(data)=>{
        let datas =data;
        if(datas[0] == '{'){
          datas = JSON.parse(datas);
          this.attendeeCount =datas['attendees'];
          this.nonAttendeeCount = datas['nonAttendees'];
            
          
        }
      }
    })
  }

  deleteEmployees(empId: any) {

    
    let data = [empId];
     
    this.adminService.inviteEmployees(data).subscribe({
      next:(data)=>{
        alert(data);
      },
      error:(error)=>{
        alert(error.error)
      },
      complete:()=>{
        this.attendees = [];
        this.getAttendees();
      }
    })

    

   

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
    this.attendees=[...this.attendees , ...this.attendeesData];
    // console.log(this.attendees);
    
    // sessionStorage.setItem('attendees',JSON.stringify(this.attendees));

    }
    

    
  })

}   
this.getAtttendeesCount();
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

  onScrollingAttendData(event:any){
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
   
      let course = JSON.parse(sessionStorage.getItem('attend') || '1');
      course+=1;
      sessionStorage.setItem('attend',String(course));
      this.getAttendees();
    }
  }
  

  onScrollingNon(event:any){

    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
   
      let course = JSON.parse(sessionStorage.getItem('non-attend') || '1');
      course+=1;
      sessionStorage.setItem('non-attend',String(course));
      this.courseDetail();
    }
  }
}
