import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.css']
})
export class ErrorMessagesComponent implements OnInit {
error_data : any;
  constructor() { }

  ngOnInit(): void {
    this.error_data = JSON.parse(sessionStorage.getItem('error') as any);
    console.log(Object.keys(this.error_data));
    

  }

}
