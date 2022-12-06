import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
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
  display = false;
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

  constructor(private dialog: MatDialog, private adminService: AdminServiceService) { }

  ngOnInit(): void {

    this.courseDetails = JSON.parse(sessionStorage.getItem('course_details') as any);
    console.log(this.courseDetails);

    let start_time = this.courseDetails.startTime.split(':');
    console.log(start_time[0]);
    this.trainingModes=this.courseDetails.trainingMode;
    this.startTimehrs = Number(start_time[0]);
    if (this.startTimehrs > 12) {
      this.startTimehrs = (this.startTimehrs - 12);
      this.startTimeMedian = 'pm';
    } else {
      this.startTimehrs = (this.startTimehrs);
      this.startTimeMedian = 'am';
    }
    this.startTimemins = Number(start_time[1]);
    if (this.startTimemins < 10) {
      this.startTimemins = '0' + (this.startTimemins);
    }

    let end_time = this.courseDetails.endTime.split(':');
    console.log(start_time[0]);

    this.endTimehrs = Number(end_time[0]);
    if (this.endTimehrs > 12) {
      this.endTimehrs = (this.endTimehrs - 12);
      this.endTimemedian = 'pm';
    }
    else {
      this.endTimemedian = 'am';
    }
    this.endTimemins = Number(end_time[1]);
    if (this.endTimemins < 10) {
      this.endTimemins = '0' + (this.endTimemins);
    }
    let splitDuration = this.courseDetails.duration.split(':');
    this.splitDurationhrs=Number(splitDuration[0]);
    this.splitDurationmins=Number(splitDuration[1]);
    this.splitDurationsecs=Number(splitDuration[2]);
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
      'courseName': new FormControl(String(this.courseDetails.courseName), [Validators.required]),
      'trainer': new FormControl(String(this.courseDetails.trainer), [Validators.required]),
      'trainingMode': new FormControl(''),
      'startDate': new FormControl(String(this.courseDetails.startDate), [Validators.required]),
      'endDate': new FormControl(String(this.courseDetails.endDate)),
      'startTime_hrs': new FormControl(this.startTimehrs, [Validators.required]),
      'startTime_mins': new FormControl(this.startTimemins, [Validators.required]),
      'startTime_median': new FormControl(this.startTimeMedian, [Validators.required]),
      'endTime_hrs': new FormControl(this.endTimehrs),
      'endTime_mins': new FormControl(this.endTimemins),
      'endTime_median': new FormControl(this.endTimemedian),
      'durationTime_hrs': new FormControl(this.splitDurationhrs),
      'durationTime_mins': new FormControl(this.splitDurationmins),
      'durationTime_seconds': new FormControl(this.splitDurationsecs),
      'meetingInfo': new FormControl(String(this.courseDetails.meetingInfo))
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
      endTime = endTime_hrs + ":" + endTime_mins + ":" + "00";
      console.log(startTime);
      console.log(endTime);
    }
    else {
      endTime = null;
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
