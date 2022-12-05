import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-training-count',
  templateUrl: './training-count.component.html',
  styleUrls: ['./training-count.component.css']
})
export class TrainingCountComponent implements OnInit {
  activeCount=0;
  upcomingCount=0;
  completedCount=0;
  constructor(private adminService:AdminServiceService) { }

  ngOnInit(): void {
    this.adminService.activeCount().subscribe(data=>{
      console.log(data);
      this.activeCount=JSON.parse(data);
      
    })
    this.adminService.upcomingCount().subscribe(data=>{
      console.log(data);
      this.upcomingCount=JSON.parse(data);
      
    })
    this.adminService.completedCount().subscribe(data=>{
      console.log(data);
      this.completedCount=JSON.parse(data);
      
    })
  }


}
