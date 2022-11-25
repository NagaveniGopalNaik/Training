import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.css']
})
export class EmployeeRegisterComponent implements OnInit {
employee_register_form !: FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.employee_register_form = this.fb.group({
      'empId':[],
      'empName':[],
      'password':[],
      'designation':[],
      'email':[]

  });
}

addEmployee(){
  console.log(this.employee_register_form.value);
  
}

}
