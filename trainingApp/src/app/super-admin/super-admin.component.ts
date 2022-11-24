import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssignEmployeeRoleComponent } from '../assign-employee-role/assign-employee-role.component';
@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  employee_data_edit(){
this.dialog.open(AssignEmployeeRoleComponent,{panelClass:'update-employee-role'});
  }
}
