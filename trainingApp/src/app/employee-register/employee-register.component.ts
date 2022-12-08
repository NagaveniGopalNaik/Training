import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SuperAdminService } from '../super-admin.service';
import { ErrorMessagesComponent } from '../error-messages/error-messages.component';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.css']
})
export class EmployeeRegisterComponent implements OnInit {
employee_register_form !: FormGroup;
RegisterData:any[]=[];
excelData:any;
uploadData=false;
formData=false;
select=true;
  constructor(private superAdmin:SuperAdminService,private dialog:MatDialog) { }

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
readExcel(event:any){
let file = event.target.files[0];
let fileReader = new FileReader();
fileReader.readAsBinaryString(file);
fileReader.onload=(e)=>{
  var dataList = XLSX.read(fileReader.result,{type:'binary'});
  var sheetName = dataList.SheetNames;
  this.RegisterData = XLSX.utils.sheet_to_json(dataList.Sheets[sheetName[0]]);
  console.log(this.RegisterData);
  
}

}

upload(){
this.uploadData = true;
this.formData = false;
this.select = false;
}

form(){
this.formData = true;
this.uploadData = false;
this.select = false;
}

storeServer(){
  
  if(this.RegisterData.length > 0){
    console.log(this.RegisterData);
    this.superAdmin.registerEmployee(this.RegisterData).subscribe((data)=>{
      // this.newUpdate(this.RegisterData);
  console.log(data);
  
      data = JSON.parse(data);
      // if(typeof data === 'object'){
        
        if(data.length > 1){
  
          if(confirm("Some of employee data not able to Register")){
            sessionStorage.setItem('error',JSON.stringify(data));
            this.dialog.open(ErrorMessagesComponent,{panelClass:"error-msg"});
          }
          
        } else {
          data.map((msg:any)=>{
            alert(msg['reason']);
            if(msg['empId']){
              let object = this.RegisterData.find((data)=>{
                return data['empId'] == msg['empId'];
              });
              let index = this.RegisterData.indexOf(object);
              this.RegisterData.splice(index,1);
              
              
            }
            if(sessionStorage.getItem('allEmployee')){
              let allData = JSON.parse(sessionStorage.getItem('allEmployee') as any);
              console.log(allData);
              
              let updateData = [...this.RegisterData, ...allData];
              sessionStorage.setItem('allEmployee',JSON.stringify(updateData));
            }
  
          });
        }
      
      
      
    },(error)=>{
      console.log(error.error);
    })

  } else {
    alert('Please upload minimum one employee data')
  }
}

// newUpdate(data:any){
//   if(sessionStorage.getItem('allEmployee')){
//     let allData = JSON.parse(sessionStorage.getItem('allEmployee') as any);
//     console.log(allData);
//     let list = [...data,...allData]
//     sessionStorage.setItem('allEmployee',JSON.stringify(list));
//   } else {
//     sessionStorage.setItem('allEmployee',JSON.stringify(data));
//   }
  

  
  
  
// }
}
