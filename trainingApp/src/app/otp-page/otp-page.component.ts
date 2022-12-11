import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { ServerService } from '../server.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-otp-page',
  templateUrl: './otp-page.component.html',
  styleUrls: ['./otp-page.component.css']
})
export class OtpPageComponent implements OnInit {
otp_data!:FormGroup;
check_otp!:FormGroup;
change_password!:FormGroup;
display=false;
otpGenerate=true;
empCode:any;
otp:any;
changePassword=false;
  
  constructor(private router:Router,private service:ServerService,private matDialog:MatDialog) { }

  ngOnInit(): void {
    this.initOtp();
  }
  initOtp(){
    this.otp_data = new FormGroup({
      'empId': new FormControl('',[Validators.required,
      Validators.pattern('[A-Z]*[0-9]*')]),
      'emailId':new FormControl('',[Validators.required,
      Validators.email])
    })
  }
  checkOtp(){
  
    this.otp = String(this.check_otp.get('otpCode')?.value)+String(this.check_otp.get('otpCode1')?.value)+String(this.check_otp.get('otpCode2')?.value)+String(this.check_otp.get('otpCode3')?.value);
   console.log(this.check_otp.value);
   let object = {'empId':this.check_otp.get('empId')?.value,'otpCode':this.otp};
   
    this.service.checkOtp(object).subscribe((result)=>{
      this.empCode = JSON.parse(sessionStorage.getItem('empId') as any);
      this.display = false;
this.changePassword = true;
      
    },(error)=>{
      alert(error.error);
    })

    this.change_password = new FormGroup({
      'empId': new FormControl(this.empCode,[Validators.required,
        Validators.pattern('[A-Z]*[0-9]*')]),
        'password':new FormControl('',[Validators.required,
          Validators.minLength(8),
        Validators.pattern('(^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@,!,#,$,%,^,&,*,(,),{,}])).{1,}')
      ]),
      'otpCode':new FormControl(this.otp,[Validators.required])

    });
    // this.router.navigate(['/change-password']);
  }

  changepassword(){
    console.log(this.change_password.value);
    this.service.changePassword(this.change_password.value).subscribe((result)=>{
      alert("password update successfully");
    },(error)=>{
      alert(error.error);
    });
   
    this.matDialog.closeAll();
    
  }

  generateOtp(){
   
    sessionStorage.setItem('empId',JSON.stringify(this.otp_data.get('empId')?.value))
    this.service.getOtp(this.otp_data.value).subscribe(()=>{
      console.log("otp sent");
      
    },(error)=>{
      alert(error.error)
    });
    this.empCode = JSON.parse(sessionStorage.getItem('empId') as any);
    this.check_otp = new FormGroup({
      'empId': new FormControl(this.empCode,[Validators.required,
        Validators.pattern('[A-Z]*[0-9]*')]),
      'otpCode':new FormControl('',[Validators.required,Validators.pattern('[0-9]')]),
      'otpCode1':new FormControl('',[Validators.required,Validators.pattern('[0-9]')]),
      'otpCode2':new FormControl('',[Validators.required,Validators.pattern('[0-9]')]),
      'otpCode3':new FormControl('',[Validators.required,Validators.pattern('[0-9]')])
    })
    this.display = true;
    this.otpGenerate=false;
  }

}
