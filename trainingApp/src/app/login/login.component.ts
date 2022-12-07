import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OtpPageComponent } from '../otp-page/otp-page.component';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ServerService } from '../server.service';
import * as CryptoJS from 'crypto-js';
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
  constructor(private router:Router,private dialog:MatDialog,private server:ServerService) { }

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
      sessionStorage.setItem('course-page','1');
      console.log(this.empData.jwtToken);
      
      // if(this.empData.employee){
        this.token = this.empData.jwtToken;
        this.storeToken(this.token);
      // let   encrypt_token = CryptoJS.AES.encrypt(token,'Token@superAdmin');
        
        
      // sessionStorage.setItem('token',JSON.stringify(encrypt_token));
        let role = this.empData.employee['roles'][0].roleName;
      
        switch(role){
           case 'super_admin':this.router.navigate(['/superAdmin']);
           break;
           case 'admin':this.router.navigate(['/admin']);
           break;
           case 'manager':this.router.navigate(['/manager']);
           break;
           case 'employee':this.router.navigate(['/employee']);
         }
     
     
     
      },(error)=>{
        alert(error.error);
        
      })
     
      
      
  }
  


}
storeToken(token:any){
  console.log(token);

  // 
  // let encrypt_token = CryptoJS.AES.encrypt( token, "Token@superAdmin").toString();
sessionStorage.setItem('token',JSON.stringify(token));

// console.log(encrypt_token);


// let decrypt_token =CryptoJS.AES.decrypt(encrypt_token, "Token@superAdmin").toString(CryptoJS.enc.Utf8);
// console.log(decrypt_token);
}
changePassword(){
  
  let dialogRef = this.dialog.open(OtpPageComponent,{panelClass:"otp-dialog-box"});
  
  
  
}
}

