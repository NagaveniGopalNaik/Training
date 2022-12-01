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
      alert(data)
      
    },(error)=>{
      alert(error.error);
    })
  }

  deleteEmployee(){
    let deleteemployee ={'empId':this.update_employee_role.get('empId')?.value};
    let employeeList = [deleteemployee]
    console.log(employeeList);
    this.superAdmin.deleteEmployee(employeeList).subscribe((data)=>{
      this.deleteUpdate();
      alert(data);
      
    
      
  },(error)=>{
    alert(error.error);
    // console.log(error);
    
  })
  

}

deleteUpdate(){
  // sessionStorage.setItem('page','1');
  
  sessionStorage.removeItem('allEmployee');
  
  
}
}
