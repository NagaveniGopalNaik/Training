import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-training-count',
  templateUrl: './training-count.component.html',
  styleUrls: ['./training-count.component.css']
})
export class TrainingCountComponent implements OnInit {
  count=0;
  constructor(private adminService:AdminServiceService) { }

  ngOnInit(): void {
    this.adminService.trainingCount().subscribe(data=>{
      console.log(data);
      this.count=JSON.parse(data);
      
    })
  }


}
