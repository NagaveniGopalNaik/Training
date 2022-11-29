import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddProfileComponent } from '../add-profile/add-profile.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { InviteEmpComponent } from '../invite-emp/invite-emp.component';

@Component({
  selector: 'app-create-training',
  templateUrl: './create-training.component.html',
  styleUrls: ['./create-training.component.css']
})
export class CreateTrainingComponent implements OnInit {
  display:any;
  constructor(private dialog:MatDialog,private fb:FormBuilder) { }
  median=false;
  // createTrainingForm!: FormGroup;
 createTrainingForm=this.fb.group({

 })
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
  // chooseMedian(){
  //  this.median=true;
  // }
}
