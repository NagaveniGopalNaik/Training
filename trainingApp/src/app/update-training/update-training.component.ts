import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
// import { AddProfileComponent } from '../add-profile/add-profile.component';
import { AdminServiceService } from '../admin-service.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from '@angular/router';
import { SuperAdminComponent } from '../super-admin/super-admin.component';
import { SuperAdminService } from '../super-admin.service';


@Component({
  selector: 'app-update-training',
  templateUrl: './update-training.component.html',
  styleUrls: ['./update-training.component.css']
})
export class UpdateTrainingComponent implements OnInit {
  updateTrainingForm!: FormGroup;
  display = false;
  public Editor = ClassicEditor;
  body: any;
  courseDetails: any;
  updateTrainer: any;
  startTimehrs: any;
  startTimemins: any;
  startTimeMedian: any;
  endTimehrs: any;
  endTimemins: any;
  endTimemedian: any;
  splitDurationhrs: any;
  splitDurationmins: any;
  splitDurationsecs: any;
trainingModes:any;
attendeesData:any;
attendees:any[]=[];
endTime:any;
arrayAdd:any[]=[];
image="/assets/profile.png";


  constructor(private dialog: MatDialog, private adminService: AdminServiceService,private router : Router,private superAdmin:SuperAdminService) { }

  ngOnInit(): void {
    sessionStorage.removeItem('attend');

    // this.attendees=JSON.parse(sessionStorage.getItem('attendees') as any);
    // console.log(this.attendees);
    this.adminService.getAttendees().subscribe(data=>{
      this.attendeesData=data;
      console.log(this.attendeesData);
      
      if(this.attendeesData[0]=='{'){
        this.attendeesData = JSON.parse(this.attendeesData);
      }
      if(typeof this.attendeesData == 'object'){
      const arrayAttendees = Object.keys(this.attendeesData)[0];
      this.attendeesData=this.attendeesData[arrayAttendees]
      this.attendees=this.attendeesData;
      }
    })
    


    this.courseDetails = JSON.parse(sessionStorage.getItem('course_details') as any);
    console.log(this.courseDetails);

    let start_time = this.courseDetails.startTime.split(':');
    console.log(start_time[0]);
    this.trainingModes=this.courseDetails.trainingMode;
    console.log(this.trainingModes);
    
    this.startTimehrs = Number(start_time[0]);
    if (this.startTimehrs > 12) {
      this.startTimehrs = (this.startTimehrs - 12);
      this.startTimeMedian = 'pm';
    } else {
      this.startTimehrs = (this.startTimehrs);
      this.startTimeMedian = 'am';
    }if(this.startTimehrs<10){
      this.startTimehrs='0'+this.startTimehrs
    }
    this.startTimemins = Number(start_time[1]);
    if (this.startTimemins < 10) {
      this.startTimemins = '0' + (this.startTimemins);
    }

    if(this.endTime){
      let end_time = this.courseDetails.endTime.split(':');
    console.log(start_time[0]);
    this.endTimehrs = Number(end_time[0]);
    if (this.endTimehrs > 12) {
      this.endTimehrs = (this.endTimehrs - 12);
      this.endTimemedian = 'pm';
    }
    else {
      this.endTimemedian = 'am';
    }if(this.endTimehrs<10){
      this.endTimehrs='0'+this.endTimehrs;
    }
    if (this.endTimehrs < 10) {
      this.endTimemins = '0' + (this.endTimemins);
    }
    this.endTimemins = Number(end_time[1]);
    if (this.endTimemins < 10) {
      this.endTimemins = '0' + (this.endTimemins);
    }

    }
    
    if(this.courseDetails.duration){
      let splitDuration = this.courseDetails.duration.split(':');
    this.splitDurationhrs=Number(splitDuration[0]);
    this.splitDurationmins=Number(splitDuration[1]);
    this.splitDurationsecs=Number(splitDuration[2]);
    }
    if(this.splitDurationhrs< 10){
      this.splitDurationhrs='0'+ this.splitDurationhrs
    }else if(this.splitDurationmins< 10){
      this.splitDurationmins='0'+ this.splitDurationmins;
    }
    if(this.splitDurationsecs<10){
      this.splitDurationsecs='0'+ this.splitDurationsecs;
    }
    // sessionStorage.getItem('meetingInfo');
    this.updateForm();
  }

  updateForm() {


    this.updateTrainingForm = new FormGroup({
      'courseName': new FormControl(String(this.courseDetails.courseName || ''), [ Validators.pattern(/^[A-Za-z\s]+$/)]),
      'trainer': new FormControl(String(this.courseDetails.trainer || '',),[Validators.pattern(/^[A-Za-z\s]+$/)]),
      'trainingMode': new FormControl(this.courseDetails.trainingMode || ''),
      'startDate': new FormControl(String(this.courseDetails.startDate) || ''),
      'endDate': new FormControl(String(this.courseDetails.endDate) || ''),
      'startTime_hrs': new FormControl(this.startTimehrs || '', [ Validators.pattern("^([1-9]|1[012])$")]),
      'startTime_mins': new FormControl(this.startTimemins || '', [ Validators.pattern("^([0-5]?[0-9]|60)$")]),
      'startTime_median': new FormControl(this.startTimeMedian || ''),
      'endTime_hrs': new FormControl(this.endTimehrs || ''),
      'endTime_mins': new FormControl(this.endTimemins || ''),
      'endTime_median': new FormControl(this.endTimemedian || ''),
      'durationTime_hrs': new FormControl(this.splitDurationhrs || ''),
      'durationTime_mins': new FormControl(this.splitDurationmins || ''),
      'durationTime_seconds': new FormControl(this.splitDurationsecs || ''),
      'meetingInfo': new FormControl(String(this.courseDetails.meetingInfo || ''))
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
        this.attendees=[...this.attendees,...this.attendeesData];
        console.log(this.attendees);
    
        // sessionStorage.setItem('attendees',JSON.stringify(this.attendees));
    
        } 
        
    
        
      })
    }  else {
      this.attendees =[];
    }   
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


  updateEvent() {
    console.log(this.updateTrainingForm.valid);
    
    let startTime_hrs = String(this.updateTrainingForm.get('startTime_hrs')?.value)
    if (startTime_hrs.length <= 1) {
      startTime_hrs = "0" + startTime_hrs;
    }

    let startTime_mins = String(this.updateTrainingForm.get('startTime_mins')?.value)
    if (startTime_mins.length <= 1) {
      startTime_mins = "0" + startTime_mins;
    }
    let median = this.updateTrainingForm.get('startTime_median')?.value;
    if (median == "pm") {
      startTime_hrs = String(Number(startTime_hrs) + 12);
    }

    let startTime = startTime_hrs + ":" + startTime_mins + ":" + "00";


    let endTime_hrs = String(this.updateTrainingForm.get('endTime_hrs')?.value)
    if (endTime_hrs.length <= 1) {
      endTime_hrs = "0" + endTime_hrs;
    }
    let endTime_mins = String(this.updateTrainingForm.get('endTime_mins')?.value)
    if (endTime_mins.length <= 1) {
      endTime_mins = "0" + endTime_mins;
    }
    let endmedian = this.updateTrainingForm.get('endTime_median')?.value;
    if (endmedian == "pm") {
      endTime_hrs = String(Number(endTime_hrs) + 12);
    }
    let endTime = null;
    if (endTime_hrs != '0' && endTime_mins != '0') {
      this.endTime = endTime_hrs + ":" + endTime_mins + ":" + "00";
      console.log(startTime);
      console.log(this.endTime);
    }
    else {
      this.endTime = null;
    }



    console.log(this.updateTrainingForm.value);
console.log(this.updateTrainingForm.get('trainingMode')?.value);

    this.body = {
      courseId:(this.courseDetails.courseId),
      completionStatus:(this.courseDetails.completionStatus),
      courseName: (this.updateTrainingForm.get('courseName')?.value),
      trainer: (this.updateTrainingForm.get('trainer')?.value),
      trainingMode: (this.updateTrainingForm.get('trainingMode')?.value) || (this.courseDetails.trainingMode),
      startDate: (this.updateTrainingForm.get('startDate')?.value),
      endDate: (this.updateTrainingForm.get('endDate')?.value),
      startTime: startTime,
      endTime: this.endTime,
      meetingInfo: (this.updateTrainingForm.get('meetingInfo')?.value),
    }
    console.log(this.body);
    this.adminService.updateEvent(this.body).subscribe({
      next:(data)=>{
        alert(data);
      },
      error:(error)=>{
        alert(error.error)
      },
      complete:()=>{
        this.router.navigate(['/detailsPage']);
      }
    })


    // this.updateTrainingForm.reset();
  }
  cancelForm() {
    this.updateTrainingForm.reset();
  }

  updateData(event){
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
   
      let course = JSON.parse(sessionStorage.getItem('attend') || '1');
      course+=1;
      sessionStorage.setItem('attend',String(course));
      this.getAttendees();
    }
  }


}
