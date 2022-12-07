import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeRegisterComponent } from '../employee-register/employee-register.component';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee-header',
  templateUrl: './add-employee-header.component.html',
  styleUrls: ['./add-employee-header.component.css']
})
export class AddEmployeeHeaderComponent implements OnInit {
hiddenOption=false;

  constructor(private dialog:MatDialog,private router:Router) { }

  ngOnInit(): void {
    
    
  }
  addNewEmployee(){
    this.hiddenOption = true;
    
  }
  register(){
    this.hiddenOption = false;
    this.dialog.open(EmployeeRegisterComponent,{panelClass: 'employee-register'});
  }
  delete(){
    this.hiddenOption = false;
    this.router.navigate(['/delete-multi-employee'])
    // this.dialog.open(DeleteEmployeeComponent,{panelClass: 'delete-employee'});
  }
}
