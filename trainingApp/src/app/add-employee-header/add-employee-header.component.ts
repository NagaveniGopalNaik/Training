import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeRegisterComponent } from '../employee-register/employee-register.component';
@Component({
  selector: 'app-add-employee-header',
  templateUrl: './add-employee-header.component.html',
  styleUrls: ['./add-employee-header.component.css']
})
export class AddEmployeeHeaderComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  addNewEmployee(){
    this.dialog.open(EmployeeRegisterComponent,{panelClass: 'employee-register'});
  }
}
