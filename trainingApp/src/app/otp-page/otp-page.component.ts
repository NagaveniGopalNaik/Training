import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-page',
  templateUrl: './otp-page.component.html',
  styleUrls: ['./otp-page.component.css']
})
export class OtpPageComponent implements OnInit {
employee_code='';
mailId='';
display=false;
disabled=false;
otp:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  changePassword(){
    this.router.navigate(['/change-password']);
  }

  generateOtp(){
    this.display=true;
    this.disabled = true;
  }

}
