import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminServiceService } from '../admin-service.service';
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
  previousData:any[]=[];
  course:any;
  course_list:any[]=[];
  display_course_list:any;
  date:any;
  display=true;
  constructor(private dialog:MatDialog,private superAdmin:SuperAdminService,private server:ServerService,private admin:AdminServiceService,private router:Router) { }
//   @HostListener('scroll') onScroll(e: Event): void {
//     console.log("scrolling .... ");
//  }
  ngOnInit(): void {
    
    this.activeData();
    this.getAllEmployeeDetails();
    this.courseDetail();
    
    // this.superAdmin.courseDetails().subscribe((data)=>{
    //   console.log(data);
      
    // },(error)=>{
    //   console.log(error);
      
    // })
    
  }
  displayCourse(){
    this.display_course_list = JSON.parse(sessionStorage.getItem('courseDetails') || '[]');
  }
  statusCheck(){
    let nav_status = sessionStorage.getItem('status') || 'true';
    let filter_status = sessionStorage.getItem('filterCourse') || 'false';
    if(filter_status == 'true'){
        let course = JSON.parse(sessionStorage.getItem('filter-course-list') as any);
        
        
        
        
        this.course_list = course;
        
        
    }else{
      if(nav_status == 'true'){
        this.courseDetail();
      }
    }
    
    let display = sessionStorage.getItem('active');
    if(display == 'allEmployees'){
      this.display = false;
    } else {
      this.display = true;
    }
  }
 
  courseDetail(){
    sessionStorage.setItem('status','false');
    this.superAdmin.courseDetails().subscribe((data:any)=>{
      console.log(data);

      
     if(data[0]=='{'){
      this.course = JSON.parse(data) as any;
      // this.course = data;
      let key = Number(Object.keys(this.course));
      this.course_list = this.course[key];
      console.log(this.course_list);
     }

      for(let data of this.course_list){
        console.log(data.courseId);
        data.employee_count = 0;
        data.dropdown = false;
        
        this.superAdmin.getCourseAcceptCount(data.courseId).subscribe((datas:any)=>{
          
          // console.log(datas);
          // let value = JSON.parse( datas);
          // console.log(typeof value);
          
          
          let count = JSON.parse(datas);
          data.employee_count = count;
          // console.log(typeof count);
          
          // console.log(data.employee_count);
          
        },(error)=>{
          // console.log(error);
          data.employee_count = 0;
        })
        
      }
     
      
      sessionStorage.setItem('courseDetails',JSON.stringify(this.course_list));
      console.log(this.course_list);
      
      
      
      
    })
    
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
  courseDetailNavigate(data:any){
    sessionStorage.setItem('course_details',JSON.stringify(data));
    this.router.navigate(['/detailsPage']);
    
  }
  displayDropdown(courseData:any){
   console.log(courseData);
   
    courseData.dropdown = !courseData.dropdown;
    console.log(courseData.dropdown);
    
    let allData = JSON.parse(sessionStorage.getItem('courseDetails') as any);
    let object = allData.find((eachObject:any)=>{
      return eachObject.courseId == courseData.courseId;
    });
    if(object != undefined){
      let index = allData.indexOf(object);
      allData[index]= courseData;
     
      
      sessionStorage.setItem('courseDetails',JSON.stringify(allData));
    }
  }
  searchDatas(){
    // this.previousData = [];
    console.log(this.searchData);
    
    this.superAdmin.searchData(this.searchData).subscribe((data)=>{
      console.log(data);
      this.search_data=data;
      this.search_data = JSON.parse(this.search_data);
      let datacount = Object.keys(this.search_data)[0];
      this.search_data = this.search_data[datacount];
      // if(this.previousData.length > 0  ){
        if(this.previousData.length == 10){
          console.log(this.previousData);
        this.search_list = [...this.previousData,...this.search_data];
        } else {
          this.search_list = [...this.search_data];
          
        }
      // } else{
      //   console.log("empty data");
      //   this.search_list = [...this.search_data];
        
      // }
      sessionStorage.setItem('searchEmployee',JSON.stringify(this.search_list));
      sessionStorage.setItem('flag','true');
      this.searchData ='';

      
    },(error)=>{
      alert(error.error);
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

  removeFilter(){
    sessionStorage.removeItem('filter');
    // debugger;
    this.previousData = [];
  }
  searchEmployee(){
    if(sessionStorage.getItem('searchEmployee')){
      this.search_list = JSON.parse(sessionStorage.getItem('searchEmployee') as any);
    }
    
  }



onScrolling(event:any){
  if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
    console.log(this.currentData.length);
    let page = sessionStorage.getItem('page')
    if(this.currentData.length == 10 || this.currentData.length==0){
      this.getAllEmployeeDetails(); 
    }
  //   if(this.search_data.length == 10){
  //     let page = JSON.parse(sessionStorage.getItem('filter') as any);
  //     page = page + 1;
  //     console.log(page);
      
  //     sessionStorage.setItem('filter',JSON.stringify(page))
  //     this.searchDatas();
  //   } else{
  //     sessionStorage.setItem('filter','1')
  //   }
  }
}
onScrollingSearch(event:any){
  if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
    if(this.search_data.length == 10){
      let page = JSON.parse(sessionStorage.getItem('filter') as any);
      page = page + 1;
      console.log(page);
      
      sessionStorage.setItem('filter',JSON.stringify(page))
      this.previousData = this.search_data;
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
