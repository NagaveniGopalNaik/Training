import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProfileComponent } from '../add-profile/add-profile.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  display=false
  constructor(private dialog:MatDialog) { }
  active=true;
  upcoming=false;
  completed=false;
  allEmployees=false;
  displayEditDlt=false;
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
  activeFunction(){
    this.upcoming=false;
    this.completed=false;
    this.active=true;
    this.allEmployees=false;
  }
  upcomingFunction(){
    this.upcoming=true;
    this.completed=false;
    this.active=false;
    this.allEmployees=false;
  }
  completeFunction(){
    this.upcoming=false;
    this.completed=true;
    this.active=false;
    this.allEmployees=false;
  }

  allEmployeeFunction(){
    this.upcoming=false;
    this.completed=false;
    this.active=false;
    this.allEmployees=true;
  }
  display_edit_dlt_options(){
    this.displayEditDlt=true;
  }

}
