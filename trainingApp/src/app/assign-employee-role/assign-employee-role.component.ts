import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SuperAdminService } from '../super-admin.service';

@Component({
  selector: 'app-assign-employee-role',
  templateUrl: './assign-employee-role.component.html',
  styleUrls: ['./assign-employee-role.component.css']
})
export class AssignEmployeeRoleComponent implements OnInit {
employee_code:any;
role:any;
employeeData :any;
update_employee_role!:FormGroup;
  constructor(private superAdmin:SuperAdminService) { }

  ngOnInit(): void {
    this.employeeData = JSON.parse(sessionStorage.getItem('empData') || '{}');
    // console.log(this.employeeData.empId);
   if(this.employeeData){
    console.log(this.employeeData);
    
    
   
    this.employee_code = this.employeeData.empId;
    this.role = this.employeeData.role;
    console.log(this.employee_code);
    console.log(this.role);
    
    
   }else{
     console.log('out of loop');
     
   }
   this.updateRole();
  }

  updateRole(){
    this.update_employee_role = new FormGroup({
      'empId': new FormControl(this.employee_code,[Validators.required]),
      'roleName':new FormControl(this.role,[Validators.required])
    })
  }

  updateEmployeeRole(){
    console.log(this.update_employee_role.value);
  
    
    this.superAdmin.changeRole(this.update_employee_role.value).subscribe((data)=>{
      alert(data);
      let allData = JSON.parse(sessionStorage.getItem('allEmployee') as any);
      let object = allData.find((datas:any)=>{
        return datas.empId == this.update_employee_role.value.empId;
      });
      let index = allData.indexOf(object);
      allData[index].role = this.update_employee_role.value.roleName;
      sessionStorage.setItem('allEmployee',JSON.stringify(allData));

      let allsearchData = JSON.parse(sessionStorage.getItem('searchEmployee') as any);
      let object1 = allsearchData.find((datas:any)=>{
        return datas.empId == this.update_employee_role.value.empId;
      });
     if(object1 != undefined){
      let index1 = allsearchData.indexOf(object1);
      allsearchData[index1].role = this.update_employee_role.value.roleName;
      sessionStorage.setItem('searchEmployee',JSON.stringify(allsearchData));
      
     }
    },(error)=>{
      alert(error.error);
    })
  }

  deleteEmployee(){
    let deleteemployee ={'empId':this.update_employee_role.get('empId')?.value};
    let employeeList = [deleteemployee]
    console.log(employeeList);
    this.superAdmin.deleteEmployee(employeeList).subscribe((data)=>{
      
      alert(data);
      let allData = JSON.parse(sessionStorage.getItem('allEmployee') as any);
      let object = allData.find((datas:any)=>{
        return datas.empId == this.update_employee_role.value.empId;
      });
      let index = allData.indexOf(object);
      allData.splice(index,1);
      sessionStorage.setItem('allEmployee',JSON.stringify(allData));

      let allDatas = JSON.parse(sessionStorage.getItem('searchEmployee') as any);
      let object1 = allDatas.find((datas:any)=>{
        return datas.empId == this.update_employee_role.value.empId;
      });
      let index1 = allDatas.indexOf(object1);
      console.log(index1);
      
      allDatas.splice(index1,1);
      console.log(allDatas);
      
      sessionStorage.setItem('searchEmployee',JSON.stringify(allDatas));
      
      
    
      
  },(error)=>{
    alert(error.error);
    // console.log(error);
    
  })
  

}


}
