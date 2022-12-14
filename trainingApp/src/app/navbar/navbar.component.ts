import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
     'downDate':new FormControl('',[Validators.required]),
     'topDate':new FormControl('',[Validators.required])
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
    sessionStorage.removeItem('courseDetails');
    sessionStorage.setItem('coursePageNo','1');
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
    sessionStorage.setItem('coursePageNo','1');
    sessionStorage.removeItem('courseDetails');
    // sessionStorage.setItem('courseNavigate','true');
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
    sessionStorage.setItem('coursePageNo','1');
    sessionStorage.removeItem('courseDetails');
    // sessionStorage.setItem('courseNavigate','true');
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
    sessionStorage.setItem('coursePageNo','1');
    sessionStorage.removeItem('courseDetails');
    // sessionStorage.setItem('courseNavigate','true');
    // sessionStorage.setItem('page','1');
  }
filter(){
  this.displayFilter= !this.displayFilter;
}

apply(){
  let status = sessionStorage.getItem('active');
  if(status == 'allEmployees'){
    alert('Please apply filter based on completion status');
  } else {
    this.displayFilter = false;
    console.log(this.filterForm.value);
    this.superAdmin.filterCourse(this.filterForm.value).subscribe(data=>{
     let fetchData = data;
     if(fetchData[0] == '{'){
      fetchData = JSON.parse(fetchData) || data;
      let key = Number(Object.keys(fetchData)[0]);
      let filter_course = fetchData[key];
      console.log(filter_course);

    sessionStorage.setItem('courseDetails',JSON.stringify(filter_course));
    this.clear();
     }
    },(error)=>{
       alert(error.error)
     })
    
  }
  
    
 
}
clear(){
  this.filterForm.reset();
}
}
