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
  currentData:any[]=[];
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
  role:any;
  empCount:any[]=[];
  invites_list:any[]=[];
  notificationDetails:any[]=[];
  filter_page_display='false';
  constructor(private dialog:MatDialog,private superAdmin:SuperAdminService,private server:ServerService,private admin:AdminServiceService,private router:Router) { }
//   @HostListener('scroll') onScroll(e: Event): void {
//     console.log("scrolling .... ");
//  }
  ngOnInit(): void {
    
    this.activeData();
    this.getAllEmployeeDetails();
    this.courseDetail();
    this.invites();
    
    
    // this.superAdmin.courseDetails().subscribe((data)=>{
    //   console.log(data);
      
    // },(error)=>{
    //   console.log(error);
      
    // })
    
  }
  displayCourse(){
   
    this.filter_page_display =sessionStorage.getItem('filter-page-display') || 'false';
    
    
    this.display_course_list = JSON.parse(sessionStorage.getItem('courseDetails') || '[]');
  }
  statusCheck(){
    
    this.role = this.superAdmin.getLoginRole();
    this.role = this.superAdmin.loginRole;
    let nav_status = sessionStorage.getItem('status') || 'true';
    let filter_status = sessionStorage.getItem('filterCourse') || 'false';
    if(filter_status == 'true'){
        let course = JSON.parse(sessionStorage.getItem('filter-course-list') as any);
        
        
        
        
        this.course_list = course;
        
        
    }else{
      let courseUpdate = sessionStorage.getItem('courseUpdate') || 'false';
      if(nav_status == 'true' || courseUpdate == 'true'){
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

  courseDetailNavigate(data:any){
    
    sessionStorage.setItem('course_details',JSON.stringify(data));
    this.router.navigate(['/detailsPage']);
    
  }
  onScrollCourseData(event){
    // let scrollStatus = sessionStorage.getItem('pagination') || 'true';
    // if(scrollStatus == 'true' || scrollStatus == 'null'){
      let scrollStatus = sessionStorage.getItem('course_pagination') || 'null';
      if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
        // alert('How are you'+String(event.target.offsetHeight)+" "+String(event.target.scrollTop)+ " "+ String(event.target.scrollHeight));
        sessionStorage.setItem('course_pagination','true');
        let course = JSON.parse(sessionStorage.getItem('coursePageNo') as any);
       
       if(course != null && scrollStatus == 'true' || scrollStatus == 'null'){
  
        course+=1;
        sessionStorage.setItem('coursePageNo',String(course));
        this.courseDetail();
       }
      // }
    }
  
  }

  onScrollCourseFilter(event){
    // let scrollStatus = sessionStorage.getItem('pagination') || 'true';
    // if(scrollStatus == 'true' || scrollStatus == 'null'){
      let scrollStatus = sessionStorage.getItem('filter_pagination') || 'null';
      if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
        // alert('How are you'+String(event.target.offsetHeight)+" "+String(event.target.scrollTop)+ " "+ String(event.target.scrollHeight));
        sessionStorage.setItem('filter_pagination','true');

        // filter data pagination
        sessionStorage.setItem('filter-call','true');
      // }
    }
  
  }
 
  courseDetail(){
    
    sessionStorage.setItem('status','false');
    sessionStorage.setItem('courseUpdate','false');
    
    this.superAdmin.courseDetails().subscribe((data:any)=>{
      // console.log(data);

      // debugger;
     if(data[0]=='{'){
      this.course = JSON.parse(data) as any;
      // this.course = data;
      let key = Number(Object.keys(this.course));
      this.course = this.course[key];
      let state = sessionStorage.getItem('coursePageNo') || '1';
     
      console.log(state);
      
      if(state == '1'){
        this.course_list = [];
      }
    
      this.course_list = [...this.course , ...this.course_list];
      console.log(this.course_list);
     
      
      
     } else {
       let changeRole = sessionStorage.getItem('courseUpdate');
      
       
       this.course_list = [];
       
       
     }
     

      for(let data of this.course_list){
        
        data.employee_count = 0;
        data.dropdown = false;
        
        this.superAdmin.getCourseAcceptCount(data.courseId).subscribe((datas:any)=>{
         
          let count = JSON.parse(datas);
          if(typeof count == 'number'){
            data.employee_count = count;
            let object = this.course_list.find((datas)=>{
              return datas.courseId == data.courseId;
            })
            if(object != null){
              let index = this.course_list.indexOf(object);
              this.course_list[index]=data;
              
              sessionStorage.setItem('courseDetails',JSON.stringify(this.course_list));
            }
          }
          
          this.empCount.push(data.employee_count);
          
          
        },(error)=>{
          // console.log(error);
          data.employee_count = 0;
        })
        
        
      }

     
     
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
    this.superAdmin.getLoginRole();
    this.role = this.superAdmin.loginRole;
    
    
  
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
    // console.log(this.currentData.length);
    // console.log(event.target.offsetHeight);
    
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
      console.log(this.allEmployee);
      
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

   if(this.role == 'super_admin'){
    sessionStorage.setItem('empData',JSON.stringify(data));
    this.dialog.open(AssignEmployeeRoleComponent,{panelClass:'update-employee-role'});
   }
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
          this.superAdmin.getLoginRole();
      this.role = this.superAdmin.loginRole;
      // if(this.role == 'employee'){
      //   this.active = true;
      //   this.upcoming = false;
      //   this.completed = false;
      //   this.allEmployeeData = false;
      // }else{
        this.active = false;
        this.upcoming = false;
        this.completed = false;
        this.allEmployeeData = true;
      // }
            
          
        
        break;
    }

   
  }

  updatePage(data:any){
    let courseId = data.courseId;
    sessionStorage.setItem('course_details',JSON.stringify(data));
     
    this.admin.courseDetailsFn(courseId).subscribe(data=>{
      
      let coursedata=data;
      coursedata = JSON.parse(coursedata);
      
      
      sessionStorage.setItem('course_details',JSON.stringify(coursedata));
      // sessionStorage.setItem('trainingMode',JSON.stringify(coursedata.trainingMode));
      
  
     

      
     
    })
    this.router.navigate(['/updateTraining']);
  }

  deleteCourse(courseData:any){
    let deleteCourseId = courseData.courseId;
   if(confirm('Are you sure you want to delete this course')){
    this.admin.deleteCourse(deleteCourseId).subscribe((data)=>{
      alert(data);
      this.courseDetail();
    })
   }
  }

  invites(){
    this.superAdmin.notification().subscribe((data)=>{
   
   
      this.invites_list = JSON.parse(data || '[]');
      let key = Object.keys(this.invites_list)[0];
      this.invites_list = this.invites_list[key];
      console.log(this.invites_list);
      for(let notification of this.invites_list){
          
          
          
          
          
        this.admin.courseDetailsFn(notification.courseId).subscribe((data)=>{
          console.log(data);
          
        let details = data;
        if(details[0] == '{'){
          details = JSON.parse(details);
          
          this.notificationDetails.push(details);
          console.log(this.notificationDetails);
         
          
        } else{
          alert(data);
        }
        })
      }
      if(this.invites_list.length == 0){
        this.notificationDetails = [];
      }
    
    
      
    })
  }

  inviteDetails(invite:any){
    let data = this.invites_list.find((eachData)=>{
      return invite.courseId = eachData.courseId;
    })
    console.log(data);
    
    sessionStorage.setItem('invites-details',JSON.stringify(data));
    this.router.navigate(['/notifications']);
    
  }

  assignManager(courseData:any){
    
    sessionStorage.setItem('asign-manager-course',JSON.stringify(courseData));
    this.router.navigate(['/assign-manager']);

  }

 
}
