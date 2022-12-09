import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { SuperAdminService } from '../super-admin.service';

@Component({
  selector: 'app-training-count',
  templateUrl: './training-count.component.html',
  styleUrls: ['./training-count.component.css']
})
export class TrainingCountComponent implements OnInit {
  activeCount:any=0;
  upcomingCount:any=0;
  completedCount:any=0;
  role:any;
  constructor(private superAdmin:SuperAdminService) { }

  ngOnInit(): void {
    this.getRole();

    this.courseCountUrl();
  }
  getRole(){
    
   
   

    
 

    let changeRoleStatus = sessionStorage.getItem('changeEmployeeRole') || 'false';
  
    
    if(changeRoleStatus == 'true'){
      
      this.courseCountUrl();
       
        

    }
    
    

    
    
    

  }

  courseCountUrl(){
    this.superAdmin.activeCount().subscribe((data)=>{
      
      this.activeCount = data;
      
    },(error)=>{
      console.log(error);
      
    });

    this.superAdmin.upcomingCount().subscribe((data)=>{
      
      this.upcomingCount = data;
      
    },(error)=>{
      console.log(error);
      
    })
   
    this.superAdmin.completedCount().subscribe((data)=>{
      
      this.completedCount = data;
      
    },(error)=>{
      console.log(error);
      
    })
    
  }


}
