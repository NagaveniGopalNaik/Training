import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
active=true;
upcoming=false;
completed=false;
displayFilter=false;
  constructor() { }

  ngOnInit(): void {
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
