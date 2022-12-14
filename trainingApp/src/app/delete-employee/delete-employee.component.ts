import { BaseCdkCell } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SuperAdminService } from '../super-admin.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {
currentData:any;
allEmployee:any;
remove=false;
delete_list:any[]=[];
  constructor(private superAdmin:SuperAdminService,private router:Router) { }

  ngOnInit(): void {
    this.getAllEmployeeDetails()
  }

  getAllEmployeeDetails(){
    if(sessionStorage.getItem('allEmployee')){
      this.allEmployee = JSON.parse(sessionStorage.getItem('allEmployee') as any);
      console.log(this.allEmployee);
      for(let empoloyee of this.allEmployee){
        empoloyee.remove = false;
      }

   
    }
    
  }
  onScrolling(event:any){
    // if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
    //   console.log(this.currentData.length);
    //   let page = sessionStorage.getItem('page')
    //   if(this.currentData.length == 10 || this.currentData.length==0){
    //     this.getAllEmployeeDetails(); 
    //   }
      
    // }
  }

  removeItem(deleteData:any){
    deleteData.remove = true;
    let data = this.allEmployee.find((datas:any)=>{
      return datas.empId == deleteData.empId;
    })
    let index = this.allEmployee.indexOf(data);
    this.allEmployee[index]= deleteData;
    this.delete_list.push(deleteData.empId);
    console.log(this.delete_list);
    
    // this.remove = true;
  }
  notremove(details:any){
    details.remove = false;
    let data = this.allEmployee.find((datas:any)=>{
      return datas.empId == details.empId;
    })
    let index = this.allEmployee.indexOf(data);
    let not_delete = this.delete_list.find((data)=>{
      return details.empId = data;
    })
    if(not_delete != undefined){
      let index = this.delete_list.indexOf(not_delete);
      this.delete_list.splice(index,1);
    }
    this.allEmployee[index]= details;

  }

  submitData(){

this.superAdmin.deleteEmployee(this.delete_list).subscribe((data:any)=>{
alert(data);
for(let deleteData of this.delete_list){
  let data = this.allEmployee.find((datas:any)=>{
    return datas.empId == deleteData;
});
if(data!= undefined){
  let index = this.allEmployee.indexOf(data);
  this.allEmployee.splice(index,1);
}


}

sessionStorage.setItem('allEmployee',JSON.stringify(this.allEmployee))
this.router.navigate(['/superAdmin']);
},(error)=>{
  alert(error.error);
})
  }
  backDashBoard(){
this.router.navigate(['/dashboard']);
  }
}
