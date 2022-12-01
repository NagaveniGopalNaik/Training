import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  active=false;
  upcoming=false;
  completed=false;
  count=0;
  allEmployees=false;
  displayFilter=false;

  activeTag:any;
    constructor( private adminService: AdminServiceService) { }

  ngOnInit(): void {
   this.getActive();

  }

  getActive(){
  this.activeTag = sessionStorage.getItem('active') || 'active';
  switch(this.activeTag){
    case 'active':
      this.active = true;
     
      break;
      case 'upcoming':
      
      this.upcoming = true;
      
      break;
      case 'completed':
      
      this.completed = true;
      
      break;
      case 'allEmployees':
      
      this.allEmployees = true;
      break;
  }



  activeFunction(){
    this.upcoming=false;
    this.completed=false;
    this.active=true;
    this.allEmployees=false;
    sessionStorage.setItem('active','active');
  }
  upcomingFunction(){
    this.upcoming=true;
    this.completed=false;
    this.active=false;
    this.allEmployees=false;
    sessionStorage.setItem('active','upcoming');
  }
  completeFunction(){
    this.upcoming=false;
    this.completed=true;
    this.active=false;
    this.allEmployees=false;
    sessionStorage.setItem('active','completed');
  }

  allEmployeeFunction(){
    this.upcoming=false;
    this.completed=false;
    this.active=false;
    this.allEmployees=true;
    sessionStorage.setItem('active','allEmployees');
  }
filter(){
  this.displayFilter=true;
}

apply(){
  this.displayFilter = false;
}
}
