import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SuperAdminService } from '../super-admin.service';

@Component({
  selector: 'app-reject-reason',
  templateUrl: './reject-reason.component.html',
  styleUrls: ['./reject-reason.component.css']
})
export class RejectReasonComponent implements OnInit {
reject_form!:FormGroup;
  constructor(private router:Router,private superAdmin:SuperAdminService) { }

  ngOnInit(): void {
    this.rejectForm();
  }
rejectForm(){
  this.reject_form = new FormGroup({
    'reason':new FormControl('',[Validators.required])
  })
}
  send(){
console.log(this.reject_form.value);
if(confirm('Are you sure you want to reject this training?')){
  this.superAdmin.rejectInvite(this.reject_form.value).subscribe({
    next : data=>{
      alert(data)
      
    },error : (error)=>{
alert(error.error)
    },
    complete : ()=>{
      this.router.navigate(['/dashboard']);
    }
  })
}





  }

  cancel(){
    this.router.navigate(['/notifications']);
      }
    

}
