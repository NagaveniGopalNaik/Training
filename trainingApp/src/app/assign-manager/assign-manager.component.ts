import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-assign-manager',
  templateUrl: './assign-manager.component.html',
  styleUrls: ['./assign-manager.component.css']
})
export class AssignManagerComponent implements OnInit {
managerList:any;
addManageList:any[]=[];
removeManageList:any[]=[];
key:any;
searchKey='';
  constructor(private admin:AdminServiceService,private router:Router) { }

  ngOnInit(): void {
    this.getManager();
  }
  getManager(){
    let courseData =JSON.parse(sessionStorage.getItem('asign-manager-course') as any);
    console.log(courseData);

    let id = courseData.courseId;
    
    this.admin.getManagertoCourse(id).subscribe({
      next:(data)=>{
        if(data[0]=='{'){
          this.managerList = JSON.parse(data);
          this.key = Object.keys(this.managerList);
          this.managerList = this.managerList[this.key];
          console.log(this.managerList);
          
        }
      },
      error:(error)=>{
        console.log(error);
        
      }
    })
  }

  allData(){
    this.getManager();
  }

  assignCourse(){
    console.log(this.addManageList)
    console.log(this.removeManageList);
    ;
    
    // console.log(this.addManageList);
    if(this.addManageList.length > 0){
      this.admin.assignManager(this.addManageList).subscribe({
        next:(data)=>{
          alert(data);
        },
        error:(error)=>{
          console.log(error);
          
        },
        complete:()=>{
          this.router.navigate(['/dashboard']);
        }
      })
    }
    if(this.removeManageList.length > 0){
      this.admin.deleteManager(this.removeManageList).subscribe({
        next:(data)=>{
          alert(data);
        },
        error:(error)=>{
          console.log(error);
          
        },
        complete:()=>{
          this.router.navigate(['/dashboard']);
        }
      })
    }
    

  }

  addManager(manager){
    let data = {'empId':manager.empId}
    let dataObject = this.removeManageList.find((datas)=>{
      return datas == data;
          });
    if(dataObject != null){
            let index = this.removeManageList.indexOf(dataObject);
            this.removeManageList.splice(index,1);
    }
    this.addManageList.push(data);
    let object = this.managerList.find((eachData)=>{
      return eachData.empId === manager.empId;
    })
    if(object != null){
      let index = this.managerList.indexOf(object);
      this.managerList[index].status = true;
    }
  }

  assignReportees(manager){
    sessionStorage.setItem('managerData',JSON.stringify(manager));
    this.router.navigate(['/assign-reportees']);
  }

  removeSelect(manager){
    let datas = {'empId':manager.empId};
    this.removeManageList.push(datas);
    let dataObject = this.addManageList.find((data)=>{
return data == datas;
    });
    if(dataObject != null){
      let index = this.addManageList.indexOf(dataObject);
      this.addManageList.splice(index,1);
    }
    let object = this.managerList.find((eachData)=>{
      return eachData.empId === manager.empId;
    })
    if(object != null){
      let index = this.managerList.indexOf(object);
      this.managerList[index].status = false;
    }
    
  }
  back(){
    this.router.navigate(['/dashboard']);
  }

  search(){
    this.admin.searchManager(this.searchKey).subscribe({
      next:(data)=>{
        let datas = data;
        if(datas[0]=='['){
          this.managerList = JSON.parse(data);
        } else {
          alert(data);
        }
      },
      error:(error)=>{
        alert(error.error);
      }
    })
  }

}
