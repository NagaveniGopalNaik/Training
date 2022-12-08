import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddProfileComponent } from '../add-profile/add-profile.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { InviteEmpComponent } from '../invite-emp/invite-emp.component';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { AdminServiceService } from '../admin-service.service';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { text } from '@fortawesome/fontawesome-svg-core';


@Component({
  selector: 'app-create-training',
  templateUrl: './create-training.component.html',
  styleUrls: ['./create-training.component.css']
})
export class CreateTrainingComponent implements OnInit {
  display: any;
  constructor(private dialog: MatDialog,private adminService:AdminServiceService) { }
  median = false;
  body: any;
  createTrainingForm!: FormGroup;
  public Editor = ClassicEditor;
  endTime:any;
  ngOnInit(): void {
    this.createForm()
  }


  createForm() {
    this.createTrainingForm = new FormGroup({
      'courseName': new FormControl('', [Validators.required , Validators.pattern(/^[A-Za-z\s]+$/)]),
      'trainer': new FormControl('', [Validators.required , Validators.pattern(/^[A-Za-z\s]+$/)]),
      'trainingMode': new FormControl(''),
      'startDate': new FormControl(''),
      'endDate': new FormControl(''),
      'startTime_hrs':new FormControl(''),
      'startTime_mins':new FormControl(''),
      'startTime_median':new FormControl(''),
      'endTime_hrs':new FormControl(''),
      'endTime_mins':new FormControl(''),
      'endTime_median':new FormControl(''),
      'durationTime_hrs':new FormControl(''),
      'durationTime_mins':new FormControl(''),
      'durationTime_seconds':new FormControl(''),
      'meetingInfo': new FormControl('')
    })
    // sessionStorage.setItem('refForm',JSON.stringify(this.createTrainingForm));
    
    
  }
  createEvent() {
    let startTime_hrs=String(this.createTrainingForm.get('startTime_hrs')?.value)
    if(startTime_hrs.length<=1){
      startTime_hrs="0"+startTime_hrs;
    }

    let startTime_mins=String(this.createTrainingForm.get('startTime_mins')?.value)
    if(startTime_mins.length<=1){
      startTime_mins="0"+startTime_mins;
    }
    let median=this.createTrainingForm.get('startTime_median')?.value;
    if(median=="pm"){
      startTime_hrs=String(Number(startTime_hrs)+12);
    }
    
    let startTime=startTime_hrs+":"+startTime_mins+":"+"00";


    let endTime_hrs=String(this.createTrainingForm.get('endTime_hrs')?.value)
    if(endTime_hrs.length<=1){
      endTime_hrs="0"+ endTime_hrs;
    }
    let endTime_mins=String(this.createTrainingForm.get('endTime_mins')?.value)
    if(endTime_mins.length<=1){
      endTime_mins="0"+ endTime_mins;
    }
    let endmedian=this.createTrainingForm.get('endTime_median')?.value;
    if(endmedian=="pm"){
      endTime_hrs=String(Number(endTime_hrs)+12);
    }
   
    if(endTime_hrs!='0' && endTime_mins!='0'){
      this.endTime=endTime_hrs+":"+endTime_mins+":"+"00";
    console.log(startTime);
    console.log(this.endTime);
    }
    else{
      this.endTime=null;
    }
    

   console.log(this.createTrainingForm.value);

    this.body = {
      courseName: (this.createTrainingForm.get('courseName')?.value),
      trainer: (this.createTrainingForm.get('trainer')?.value),
      trainingMode: (this.createTrainingForm.get('trainingMode')?.value),
      startDate: (this.createTrainingForm.get('startDate')?.value),
      endDate: (this.createTrainingForm.get('endDate')?.value),
      startTime: startTime,
      endTime: this.endTime,
      meetingInfo: (this.createTrainingForm.get('meetingInfo')?.value),
    }
    // this.adminService.createEvent(this.body).subscribe((data)=>{
    //   this.cancelForm();
    //   console.log(data);
      
    //   alert(data);
    // },(error)=>{
     
    //   alert(error.error);
    // })
    this.adminService.createEvent(this.body).subscribe(data=>{
      alert(data);
    },error=>{
      alert(error.error)
    })

 


    // this.createTrainingForm.reset();
  }
  cancelForm() {
    this.createTrainingForm.reset();
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
  // chooseMedian(){
  //  this.median=true;
  // }
}
