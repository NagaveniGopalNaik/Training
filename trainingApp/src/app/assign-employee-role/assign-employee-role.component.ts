import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assign-employee-role',
  templateUrl: './assign-employee-role.component.html',
  styleUrls: ['./assign-employee-role.component.css']
})
export class AssignEmployeeRoleComponent implements OnInit {
employee_code="";
role='';
  constructor() { }

  ngOnInit(): void {
  }

}
