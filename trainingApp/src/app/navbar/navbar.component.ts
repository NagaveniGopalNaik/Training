import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  active=true;
  upcoming=false;
  completed=false;
  allEmployees=false;
  displayFilter=false;
  constructor() { }

  ngOnInit(): void {
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
filter(){
  this.displayFilter=true;
}

apply(){
  this.displayFilter = false;
}
}
