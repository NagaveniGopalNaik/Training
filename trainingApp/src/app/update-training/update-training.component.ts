import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddProfileComponent } from '../add-profile/add-profile.component';
import { AdminServiceService } from '../admin-service.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-update-training',
  templateUrl: './update-training.component.html',
  styleUrls: ['./update-training.component.css']
})
export class UpdateTrainingComponent implements OnInit {
  updateTrainingForm!: FormGroup;
  display=false;
  body: any;
  constructor(private dialog:MatDialog,private adminService:AdminServiceService) { }

  ngOnInit(): void {
    this.updateForm()
  }
  updateForm() {
    this.updateTrainingForm = new FormGroup({
      'courseName': new FormControl('', [Validators.required]),
      'trainer': new FormControl('',),
      'trainingMode': new FormControl(''),
      'startDate': new FormControl('', [Validators.required]),
      'endDate': new FormControl(''),
      'startTime_hrs':new FormControl('', [Validators.required]),
      'startTime_mins':new FormControl('', [Validators.required]),
      'startTime_median':new FormControl('', [Validators.required]),
      'endTime_hrs':new FormControl(''),
      'endTime_mins':new FormControl(''),
      'endTime_median':new FormControl(''),
      'durationTime_hrs':new FormControl(''),
      'durationTime_mins':new FormControl(''),
      'durationTime_seconds':new FormControl(''),
      'meetingInfo': new FormControl('')
    })
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
  updateEvent() {
    let startTime_hrs=String(this.updateTrainingForm.get('startTime_hrs')?.value)
    if(startTime_hrs.length<=1){
      startTime_hrs="0"+startTime_hrs;
    }

    let startTime_mins=String(this.updateTrainingForm.get('startTime_mins')?.value)
    if(startTime_mins.length<=1){
      startTime_mins="0"+startTime_mins;
    }
    let median=this.updateTrainingForm.get('startTime_median')?.value;
    if(median=="pm"){
      startTime_hrs=String(Number(startTime_hrs)+12);
    }
    
    let startTime=startTime_hrs+":"+startTime_mins+":"+"00";


    let endTime_hrs=String(this.updateTrainingForm.get('endTime_hrs')?.value)
    if(endTime_hrs.length<=1){
      endTime_hrs="0"+ endTime_hrs;
    }
    let endTime_mins=String(this.updateTrainingForm.get('endTime_mins')?.value)
    if(endTime_mins.length<=1){
      endTime_mins="0"+ endTime_mins;
    }
    let endmedian=this.updateTrainingForm.get('endTime_median')?.value;
    if(endmedian=="pm"){
      endTime_hrs=String(Number(endTime_hrs)+12);
    }
    let endTime = null;
    if(endTime_hrs!='0' && endTime_mins!='0'){
      endTime=endTime_hrs+":"+endTime_mins+":"+"00";
    console.log(startTime);
    console.log(endTime);
    }
    else{
      endTime=null;
    }
    

   console.log(this.updateTrainingForm.value);

    this.body = {
      courseName: (this.updateTrainingForm.get('courseName')?.value),
      trainer: (this.updateTrainingForm.get('trainer')?.value),
      trainingMode: (this.updateTrainingForm.get('trainingMode')?.value),
      startDate: (this.updateTrainingForm.get('startDate')?.value),
      endDate: (this.updateTrainingForm.get('endDate')?.value),
      startTime: startTime,
      endTime: endTime,
      meetingInfo: (this.updateTrainingForm.get('meetingInfo')?.value),
    }
    // this.adminService.updateEvent(this.body).subscribe(data=>{
    //   alert(data);
    //   this.cancelForm();
    // })


    // this.updateTrainingForm.reset();
  }
  cancelForm() {
    this.updateTrainingForm.reset();
  }
 

}
