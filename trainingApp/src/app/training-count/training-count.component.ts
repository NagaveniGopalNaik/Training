import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { SuperAdminService } from '../super-admin.service';

@Component({
  selector: 'app-training-count',
  templateUrl: './training-count.component.html',
  styleUrls: ['./training-count.component.css']
})
export class TrainingCountComponent implements OnInit {
  activeCount=0;
  upcomingCount=0;
  completedCount=0;
  role:any;
  constructor(private superAdmin:SuperAdminService) { }

  ngOnInit(): void {
    this.getRole();
  }
  getRole(){
    let loginData = JSON.parse(sessionStorage.getItem('login') as any);
    this.role = loginData['employee'].roles[0].roleName;
    if(this.role == 'super_admin' || 'admin'){
      this.apiCall();
    } else if(this.role == 'employee'){
      this.apiCall();
    } else{
      this.apiCall();
    }
    
    

  }

  apiCall(){

    this.superAdmin.activeCount(this.role).subscribe(data=>{
      console.log(data);
      this.activeCount=JSON.parse(data);
      console.log(this.activeCount);
      
      
    })
    this.superAdmin.upcomingCount(this.role).subscribe(data=>{
      console.log(data);
      this.upcomingCount=JSON.parse(data);
      console.log(this.upcomingCount);
      
      
    })
    this.superAdmin.completedCount(this.role).subscribe(data=>{
      console.log(data);
      this.completedCount=JSON.parse(data);
      console.log(this.completedCount);
      
      
    })
  }


}
