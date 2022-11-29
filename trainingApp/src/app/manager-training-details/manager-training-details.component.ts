import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProfileComponent } from '../add-profile/add-profile.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-manager-training-details',
  templateUrl: './manager-training-details.component.html',
  styleUrls: ['./manager-training-details.component.css']
})
export class ManagerTrainingDetailsComponent implements OnInit {

  constructor(private dialog:MatDialog) { }
  display=false;
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
}