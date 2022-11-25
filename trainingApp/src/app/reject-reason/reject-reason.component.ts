import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reject-reason',
  templateUrl: './reject-reason.component.html',
  styleUrls: ['./reject-reason.component.css']
})
export class RejectReasonComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  send(){
this.router.navigate(['/notifications']);
  }

  cancel(){
    this.router.navigate(['/notifications']);
      }
    

}
