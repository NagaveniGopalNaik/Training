import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SuperAdminService } from '../super-admin.service';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.css']
})
export class EmployeeRegisterComponent implements OnInit {
employee_register_form !: FormGroup;
RegisterData:any[]=[];
  constructor(private superAdmin:SuperAdminService) { }

  ngOnInit(): void {
  this.registerForm();
}

registerForm(){
this.employee_register_form = new FormGroup({
  'empId':new FormControl('',[Validators.required,
    Validators.pattern('[A-Z ]*[0-9]*')]),
    'empName':new FormControl('',[Validators.required,
    Validators.pattern('[A-Za-z ]*')]),
    'password':new FormControl('',[Validators.required,
      Validators.minLength(8),
    Validators.pattern('(^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@,!,#,$,%,^,&,*,(,),{,}])).{1,}')
  ]),
  'designation':new FormControl('',[Validators.required,
    Validators.pattern('[A-Za-z ]*')]),
    'email':new FormControl('',[Validators.required,Validators.email])
})
}

addEmployee(){
  console.log(this.employee_register_form.value);
  this.RegisterData.push(this.employee_register_form.value);
  this.reset();
  // this.registerForm.markAsUntouched();
}
reset(){
  this.employee_register_form.reset();
 
  Object.keys(this.employee_register_form.controls).forEach(key => {
    this.employee_register_form.get(key)?.setErrors(null) ;
});

}

storeServer(){
  console.log(this.RegisterData);
  this.superAdmin.registerEmployee(this.RegisterData).subscribe((data)=>{
    console.log(data);
    alert("Registration successfully");
    
  },(error)=>{
    console.log(error.error);
  })
}
}
