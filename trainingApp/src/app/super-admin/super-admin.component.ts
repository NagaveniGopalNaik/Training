import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  employeeDetails:any;
  datas:any;
  searchData:any;
  filter=false;
  allData=true;
  search_data:any;
  search_list:any;
  
  
  constructor(private dialog:MatDialog,private superAdmin:SuperAdminService,private server:ServerService) { }
//   @HostListener('scroll') onScroll(e: Event): void {
//     console.log("scrolling .... ");
//  }
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

  searchDatas(){
    let datas = this.search_data;
    console.log(this.searchData);
    this.superAdmin.searchData(this.searchData).subscribe((data)=>{
      console.log(data);
      this.search_data=data;
      this.search_data = JSON.parse(this.search_data);
      let datacount = Object.keys(this.search_data)[0];
      this.search_data = this.search_data[datacount];
      if(datas.length == 10){
        console.log(datas);
        this.search_list = [...datas,...this.search_data];

        
      } else{
        console.log("empty data");
        this.search_list = [...this.search_data];
        
      }

      sessionStorage.setItem('flag','true');
      this.searchData ='';

      
    })
    
  }

  getEmployeeData(){
    if(sessionStorage.getItem('flag')){
      let result = JSON.parse(sessionStorage.getItem('flag') as any);
      if(result == true){
        this.filter = true;
        this.allData = false;

      } else {
        this.filter = false;
        this.allData = true;
      }
    }
    if(sessionStorage.getItem('allEmployee')){
      this.employeeDetails = JSON.parse(sessionStorage.getItem('allEmployee') as any);
    //   if(this.employeeDetails.length < 1){
       
    //     sessionStorage.setItem('page','0');
    //     this.allEmployee =[];
    //     this.datas = [];
    //     this.employeesList = [];
    //     this.currentData = [];
    //     this.getAllEmployeeDetails();
    //   }
    }
    
  }



onScrolling(event:any){
  if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
    console.log(this.currentData.length);
    let page = sessionStorage.getItem('page')
    if(this.currentData.length == 10 || this.currentData.length==0){
      this.getAllEmployeeDetails(); 
    }
    if(this.search_data.length == 10){
      let page = JSON.parse(sessionStorage.getItem('filter') as any);
      page = page + 1;
      console.log(page);
      
      sessionStorage.setItem('filter',JSON.stringify(page))
      this.searchDatas();
    } else{
      sessionStorage.setItem('filter','1')
    }
  }
}
onScrollingSearch(event:any){
  if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
    if(this.search_data.length == 10){
      let page = JSON.parse(sessionStorage.getItem('filter') as any);
      page = page + 1;
      console.log(page);
      
      sessionStorage.setItem('filter',JSON.stringify(page))
      this.searchDatas();
    } else{
      sessionStorage.removeItem('filter');
    }
  }
}

  getAllEmployeeDetails(){
  
    this.datas = this.allEmployee;
   
    
   
    this.superAdmin.AllEmployeeDetails().subscribe((data)=>{
      
      this.allEmployee = JSON.parse(data);
      let keys = Object.keys(this.allEmployee)[0];
      if(keys == '0'){
        sessionStorage.removeItem('page');
      } else {
        // console.log(keys);
      // if(data){
        this.allEmployee = this.allEmployee[keys];
        this.currentData  = this.allEmployee;
        if(this.datas != undefined){
          console.log(this.datas);
          
          this.employeesList = [...this.datas,...this.allEmployee]
          
        } else{
          this.employeesList = [...this.allEmployee];
        }
        
        console.log(this.employeesList);
        this.allEmployee = this.employeesList;
        // this.employeeDetails = this.allEmployee;
        sessionStorage.setItem('allEmployee',JSON.stringify(this.allEmployee));
      // this.allEmployee = [data,...this.allEmployee];
      // } else{
      //   this.allEmployee = [this.allEmployee];
      // }
     
      
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
