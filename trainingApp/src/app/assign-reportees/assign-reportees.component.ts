import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from '../admin-service.service';


@Component({
  selector: 'app-assign-reportees',
  templateUrl: './assign-reportees.component.html',
  styleUrls: ['./assign-reportees.component.css']
})
export class AssignReporteesComponent implements OnInit {
employeeData:any[]=[];
key:any;
removeManageList:any[]=[];
addManageList:any[]=[];
searchKey='';
  constructor(private router:Router,private admin:AdminServiceService) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  allDatas(){
    this.getEmployeeList();
  }

  getEmployeeList(){
    this.admin.getEmployeeList().subscribe({
      next:(data)=>{
        console.log(data);
        if(data[0] == '{'){
          this.employeeData = JSON.parse(data);
          this.key = Object.keys(this.employeeData);
          this.employeeData = this.employeeData[this.key];
        }
        
      },
      error :(error)=>{
        console.log(error);
        
      }
    })
  }

  assignReportees(){
    let managerData = JSON.parse(sessionStorage.getItem('managerData') as any);
    let managerId = managerData.empId;
 let addObject = {
   "managerId":managerId,
   "empId":this.addManageList
 };
 let removeObject = {
  "managerId":managerId,
  "empId":this.removeManageList
}
console.log(addObject);
console.log(removeObject);

 
 
 if(this.addManageList.length > 0 && this.removeManageList.length == 0){
  this.admin.addReportees(addObject).subscribe({
    next:(data)=>{
      alert(data);
    },
    error:(error)=>{
      alert(error.error);
    },
    complete:()=>{
      this.router.navigate(['/assign-manager']);
    }
  })
 }
 if(this.removeManageList.length > 0 && this.addManageList.length == 0){
  this.admin.removeReportees(removeObject).subscribe({
    next:(data)=>{
      alert(data);
    },
    error:(error)=>{
      alert(error.error);
    },
    complete:()=>{
      this.router.navigate(['/assign-manager']);
    }
  })
 }

 if(this.removeManageList.length > 0 && this.addManageList.length > 0){
  this.admin.addReportees(addObject).subscribe({
    next:(data)=>{
     
    },
    error:(error)=>{
      alert(error.error);
    },
    complete:()=>{
      this.admin.removeReportees(removeObject).subscribe({
        next:(data)=>{
          alert("successfully");
        },
        error:(error)=>{
          alert(error.error);
        },
        complete:()=>{
          this.router.navigate(['/assign-manager']);
        }
      })
    
    }
  })
 }
  }
 

  back(){
    this.router.navigate(['/assign-manager']);
  }

  addReportees(employee){
    let data = employee.empId;
    let dataObject = this.removeManageList.find((datas)=>{
      return datas == data;
          });
    if(dataObject != null){
            let index = this.removeManageList.indexOf(dataObject);
            this.removeManageList.splice(index,1);
    }
    this.addManageList.push(data);
    let object = this.employeeData.find((eachData)=>{
      return eachData.empId === employee.empId;
    })
    if(object != null){
      let index = this.employeeData.indexOf(object);
      this.employeeData[index].status = true;
    }
  }

  removeSelect(employee){
    
    
    let datas = employee.empId;
    
    
    this.removeManageList.push(datas);

    
 
    
//     let dataObject = this.removeManageList.find((data)=>{
// return data == datas;
//     });
    // if(dataObject != null){
    //   let index = this.removeManageList.indexOf(dataObject);
    //   this.removeManageList.splice(index,1);
    //   console.log(this.removeManageList);
      
    // }
    let object = this.employeeData.find((eachData)=>{
      return eachData.empId === employee.empId;
    })
    if(object != null){
      let index = this.employeeData.indexOf(object);
      this.employeeData[index].status = false;
    }

    console.log(this.removeManageList);
    
  }

  search(){
    this.admin.searchReportees(this.searchKey).subscribe({
      next:(data)=>{
        let datas = data;
        if(datas[0]=='['){
          this.employeeData = JSON.parse(data);
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
