import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminServiceService } from '../admin-service.service';
import { SuperAdminService } from '../super-admin.service';

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
filterForm!:FormGroup;
  activeTag:any;
  role:any;
    constructor( private adminService: AdminServiceService,private superAdmin:SuperAdminService) { }

  ngOnInit(): void {
   this.getActive();
   this.filterForm = new FormGroup({
     'downDate':new FormControl(),
     'topDate':new FormControl()
   })


  }

  getActive(){
    this.superAdmin.getLoginRole();
    this.role = this.superAdmin.loginRole;
  this.activeTag = sessionStorage.getItem('active') || 'active';
  switch(this.activeTag){
    case 'active':
      this.active = true;
     this.adminService.data = 'active';
      break;
      case 'upcoming':
      
      this.upcoming = true;
      this.adminService.data = 'upcoming';
      break;
      case 'completed':
      
      this.completed = true;
      this.adminService.data = 'completed';
      break;
      case 'allEmployees':
      
        this.allEmployees = true;
        this.active = false;
      
     
     
      break;
  }
}

  

  activeFunction(){
    this.upcoming=false;
    this.completed=false;
    this.active=true;
    this.allEmployees=false;
    sessionStorage.setItem('active','active');
    sessionStorage.setItem('status','true');
    sessionStorage.setItem('filterCourse','false');
    // window.location.reload();
  }
  upcomingFunction(){
    this.upcoming=true;
    this.completed=false;
    this.active=false;
    this.allEmployees=false;
    sessionStorage.setItem('active','upcoming');
    sessionStorage.setItem('status','true');
    sessionStorage.setItem('filterCourse','false');
    // window.location.reload();
  }
  completeFunction(){
    this.upcoming=false;
    this.completed=true;
    this.active=false;
    this.allEmployees=false;
    sessionStorage.setItem('active','completed');
    sessionStorage.setItem('status','true');
    sessionStorage.setItem('filterCourse','false');
    // window.location.reload();
  }

  allEmployeeFunction(){
    this.upcoming=false;
    this.completed=false;
    this.active=false;
    this.allEmployees=true;
    
      sessionStorage.setItem('active','allEmployees');
    
    sessionStorage.setItem('flag','false');
    sessionStorage.setItem('status','true');
    // sessionStorage.setItem('page','1');
  }
filter(){
  this.displayFilter=true;
}

apply(){
  this.displayFilter = false;
  console.log(this.filterForm.value);
  this.superAdmin.filterCourse(this.filterForm.value).subscribe(data=>{
   let fetchData = data;
   if(fetchData[0] == '{'){
    fetchData = JSON.parse(fetchData) || data;
    let key = Number(Object.keys(fetchData)[0]);
    let filter_course = fetchData[key];
    console.log(filter_course);
    
    
    // for(let count of filter_course){
    //   count.employee_count = 0;
    //   this.superAdmin.getCourseAcceptCount(count.courseId).subscribe((data)=>{
    //   count.employee_count = JSON.parse(data);
    //   })
    // }
    
    
    sessionStorage.setItem('courseDetails',JSON.stringify(filter_course));
    
   }
   
    
  },(error)=>{
    alert(error);
    
    
  });
  this.clear();
}
clear(){
  this.filterForm.reset();
}
}
