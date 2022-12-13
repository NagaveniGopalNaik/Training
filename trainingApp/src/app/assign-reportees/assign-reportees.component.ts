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
  constructor(private router:Router,private admin:AdminServiceService) { }

  ngOnInit(): void {
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
 
 
 if(this.addManageList.length > 0){
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
 if(this.removeManageList.length > 0){
  this.admin.removeReportees(addObject).subscribe({
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
    let dataObject = this.addManageList.find((data)=>{
return data == datas;
    });
    if(dataObject != null){
      let index = this.addManageList.indexOf(dataObject);
      this.addManageList.splice(index,1);
    }
    let object = this.employeeData.find((eachData)=>{
      return eachData.empId === employee.empId;
    })
    if(object != null){
      let index = this.employeeData.indexOf(object);
      this.employeeData[index].status = false;
    }
    
  }

  

}
