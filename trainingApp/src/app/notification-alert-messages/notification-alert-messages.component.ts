import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RejectReasonComponent } from '../reject-reason/reject-reason.component';
@Component({
  selector: 'app-notification-alert-messages',
  templateUrl: './notification-alert-messages.component.html',
  styleUrls: ['./notification-alert-messages.component.css']
})
export class NotificationAlertMessagesComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  reject_reason(){
this.router.navigate(['/reject-reason']);
  }
}
