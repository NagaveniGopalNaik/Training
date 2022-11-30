import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AssignEmployeeRoleComponent } from '../assign-employee-role/assign-employee-role.component';
import { ServerService } from '../server.service';
import { SuperAdminService } from '../super-admin.service';
@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {
  active=false;
  upcoming=false;
  completed=false;
  displayFilter=false;
  allEmployeeData=false;
  courseDetails:any;
  allEmployee :any;
  employeesList:any;
  activeNavbar='active';
  currentData:any;
  constructor(private dialog:MatDialog,private superAdmin:SuperAdminService,private server:ServerService) { }
  @HostListener('scroll') onScroll(e: Event): void {
    console.log("scrolling .... ");
 }
  ngOnInit(): void {
    this.activeData();
    this.getAllEmployeeDetails();
    // this.superAdmin.courseDetails().subscribe((data)=>{
    //   console.log(data);
      
    // },(error)=>{
    //   console.log(error);
      
    // })
    
  }
  // @HostListener('scroll') onScroll(){
  //   this.getAllEmployeeDetails();
  // }
  // onScrolling(event: any) {
  //   this.getAllEmployeeDetails();
    
  //   if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
  //     console.log("End");
  //   }
  // }



onScrolling(event:any){
  if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
    console.log(this.currentData.length);
    
    if(this.currentData.length <10){
      // alert("All employee data loaded!!")
    } else {
      this.getAllEmployeeDetails(); 
    }
  }
}

  getAllEmployeeDetails(){
   
    let datas = this.allEmployee;
   
    this.superAdmin.AllEmployeeDetails().subscribe((data)=>{
      
      this.allEmployee = JSON.parse(data);
      let keys = Object.keys(this.allEmployee)[0];
      if(keys == '0'){
        sessionStorage.removeItem('page');
      } else {
        console.log(keys);
      // if(data){
        this.allEmployee = this.allEmployee[keys];
        this.currentData  = this.allEmployee;
        if(datas != undefined){
          this.employeesList = [...datas,...this.allEmployee]
          
        } else{
          this.employeesList = [...this.allEmployee];
        }
        console.log(this.employeesList);
        this.allEmployee = this.employeesList;
        
      // this.allEmployee = [data,...this.allEmployee];
      // } else{
      //   this.allEmployee = [this.allEmployee];
      // }
      console.log(this.allEmployee);
      
      // this.employeesList = [this.employeesList,...this.allEmployee];
      }
      
      
      
    },(error)=>{
      console.log(error);
      
    })
  }
  employee_data_edit(data:any){
    console.log(data);
    sessionStorage.setItem('empData',JSON.stringify(data));
this.dialog.open(AssignEmployeeRoleComponent,{panelClass:'update-employee-role'});
  }

  

  activeData(){
    this.activeNavbar = sessionStorage.getItem('active') || 'active';
    

    switch(this.activeNavbar){
      case 'active':
        this.active = true;
        this.upcoming = false;
        this.completed = false;
        this.allEmployeeData = false;
        break;
        case 'upcoming':
        this.active = false;
        this.upcoming = true;
        this.completed = false;
        this.allEmployeeData = false;
        break;
        case 'completed':
        this.active = false;
        this.upcoming = false;
        this.completed = true;
        this.allEmployeeData = false;
        break;
        case 'allEmployees':
        this.active = false;
        this.upcoming = false;
        this.completed = false;
        this.allEmployeeData = true;
        break;
    }
    
  }

 
}
