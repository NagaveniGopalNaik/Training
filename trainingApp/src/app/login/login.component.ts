import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OtpPageComponent } from '../otp-page/otp-page.component';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ServerService } from '../server.service';
import * as CryptoJS from 'crypto-js';
import { SuperAdminService } from '../super-admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
role='';
loginForm!:FormGroup;
empData:any;
token:any;
  constructor(private router:Router,private dialog:MatDialog,private server:ServerService,private superAdmin:SuperAdminService) { }

  ngOnInit(): void {
    this.initForm();
    sessionStorage.setItem('active','active');

    // sessionStorage.setItem('dialog',JSON.stringify(false));
  }

  initForm(){
    this.loginForm = new FormGroup({
      'empId':new FormControl('',[Validators.required,
        Validators.pattern('[A-Z ]*[0-9]*')]),
      'password':new FormControl('',[Validators.required,
        Validators.minLength(8),
      Validators.pattern('(^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@,!,#,$,%,^,&,*,(,),{,}])).{1,}')
    ])
    })
  }
 
login(){
  console.log(this.loginForm.value);
  if(this.loginForm.valid){
    this.server.loginData(this.loginForm.value).subscribe((data)=>{
      this.empData = JSON.parse(data);
      sessionStorage.setItem('login',JSON.stringify(this.empData));
      let role = this.empData['employee'].roles[0].roleName;

      sessionStorage.setItem('previousRole',JSON.stringify(role));
      sessionStorage.setItem('course-page','1');
      console.log(this.empData.jwtToken);

        this.token = this.empData.jwtToken;
        sessionStorage.setItem('token',JSON.stringify(this.token));
       
        this.router.navigate(['/dashboard'])
      
     
      },(error)=>{
        alert(error.error);
        
      })
     
      
      
  }
  


}

changePassword(){
  
  let dialogRef = this.dialog.open(OtpPageComponent,{panelClass:"otp-dialog-box"});
  
  
  
}
}

