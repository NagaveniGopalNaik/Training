import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  courseDetails: any;
  constructor(private dialog: MatDialog, private adminService: AdminServiceService) { }

  ngOnInit(): void {
    // let ObjectKeys = Object.keys;
    this.adminService.showCourses().subscribe(data => {
      console.log(data);
      this.courseDetails = JSON.parse(data);

      const arrayCourseDetails = Object.keys(this.courseDetails)[0];
      this.courseDetails = this.courseDetails[arrayCourseDetails]
      console.log(this.courseDetails);


      // console.log(this.courseDetails);

      // const arrayCourseDetails=Object.entries(this.courseDetails);
      // console.log(arrayCourseDetails);

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
  display_edit_dlt_options() {
    this.displayEditDlt = true;
  }
  getUpdateTraining() {

  }

}
