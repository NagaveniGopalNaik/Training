import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssignEmployeeRoleComponent } from '../assign-employee-role/assign-employee-role.component';
@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {
  active=true;
  upcoming=false;
  completed=false;
  displayFilter=false;
  allEmployeeData=false;
  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  employee_data_edit(){
this.dialog.open(AssignEmployeeRoleComponent,{panelClass:'update-employee-role'});
  }

  activeFunction(){
    this.upcoming=false;
    this.completed=false;
    this.active=true;
  }
  upcomingFunction(){
    this.upcoming=true;
    this.completed=false;
    this.active=false;
  }
  completeFunction(){
    this.upcoming=false;
    this.completed=true;
    this.active=false;
  }

  filter(){
    this.displayFilter=true;
  }
  
  apply(){
    this.displayFilter = false;
  }
}
