import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OtpPageComponent } from '../otp-page/otp-page.component';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
role='';
employee_code="";
password='';
loginForm!:NgForm;

  constructor(private router:Router,private dialog:MatDialog) { }

  ngOnInit(): void {
  }
login(formValue:NgForm){
  console.log(formValue.value);
  
switch(this.role){
  case 'superAdmin':this.router.navigate(['/super-admin']);
  break;
  case 'admin':this.router.navigate(['/admin']);
  break;
  case 'manager':this.router.navigate(['/manager']);
  break;
  case 'employee':this.router.navigate(['/employee']);
}


}
changePassword(){
  this.dialog.open(OtpPageComponent,{panelClass:"otp-dialog-box"});
}
}
