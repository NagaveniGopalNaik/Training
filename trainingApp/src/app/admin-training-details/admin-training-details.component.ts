import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProfileComponent } from '../add-profile/add-profile.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-admin-training-details',
  templateUrl: './admin-training-details.component.html',
  styleUrls: ['./admin-training-details.component.css']
})
export class AdminTrainingDetailsComponent implements OnInit {

  display=false;
  displayEditDlt=false;
  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
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
  display_edit_dlt_options(){
    this.displayEditDlt=true;
  }
}
