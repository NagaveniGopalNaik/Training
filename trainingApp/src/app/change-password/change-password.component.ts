import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  employee_code="";
  password='';
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  changePassword(){
  this.router.navigate(['/login']);
  }

}
