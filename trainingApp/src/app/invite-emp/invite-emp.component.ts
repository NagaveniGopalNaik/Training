import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-invite-emp',
  templateUrl: './invite-emp.component.html',
  styleUrls: ['./invite-emp.component.css']
})
export class InviteEmpComponent implements OnInit {
  empDetails: any;
  empId: any;
  invited = false;
  not_invited = false;
  keyOfEmpDetails:any;
  icon = '';
 arrayRemove:any[]=[];
 arrayAdd:any[]=[];
  allEmployee:any;
  
  constructor(private adminService: AdminServiceService,private router:Router) { }

  ngOnInit(): void {
    this.adminService.getEmployeesToInvite().subscribe(data => {
      console.log(data);
      this.empDetails = JSON.parse(data);
      sessionStorage.setItem('empDetails',JSON.stringify(this.empDetails));

      this.empDetails = Object.values(this.empDetails);
      console.log(this.empDetails);
  
      // this.keyOfEmpDetails=(Object.keys(this.empDetails));
      // for(let key of  this.keyOfEmpDetails){
      //   if (this.empDetails[key].invited == true) {  
      //     this.invited = true;
      //     this.not_invited = false;
      //   } else {
      //     this.invited = false;
      //     this.not_invited = true;
      //   }
      // }
      

      
    })
    
  }

  getAllEmployee(){
    if(sessionStorage.getItem('empDetails')){
      this.allEmployee = JSON.parse(sessionStorage.getItem('empDetails') as any);
    }
  }
  toggleRemove(empid: any) {
    let data = this.allEmployee.find((datas:any)=>{
      return datas.empId == empid;
    })
    if(data != undefined){
      
      let index = this.allEmployee.indexOf(data);
      this.allEmployee[index].invited = true;
      
      console.log(this.allEmployee);
      this.arrayRemove=[empid,...this.arrayRemove];
      console.log(this.arrayRemove);
      
      
      sessionStorage.setItem('empDetails',JSON.stringify(this.allEmployee));
    }
   
  }
  toggleAdd(empid: any) {
    let data = this.allEmployee.find((datas:any)=>{
      return datas.empId == empid;
    })
    if(data != undefined){
      
      let index = this.allEmployee.indexOf(data);
      this.allEmployee[index].invited = false;
      console.log(this.allEmployee);
      this.arrayAdd=[empid,...this.arrayAdd];
      console.log(this.arrayAdd);
      
      sessionStorage.setItem('empDetails',JSON.stringify(this.allEmployee));
    }
   
  }

  inviteEmployees(empId: any) {
    
  }
  deleteEmployees(empId:any) {
   
  }

  done(){

    if(this.arrayAdd.length > 0){
      this.adminService.inviteEmployees(this.arrayAdd).subscribe({
        next : (data)=>{
          
        },
        error:(error)=>{
          alert(error.error);
        },
        complete :()=>{
          this.router.navigate(['/detailsPage'])
        }
      })
    }

    if(this.arrayRemove.length > 0){
      this.adminService.deleteEmployees(this.arrayRemove).subscribe({
        next : (data)=>{
          
        },
        error:(error)=>{
          alert(error.error);
        },
        complete :()=>{
          this.router.navigate(['/detailsPage'])
        }
      })
     }
    
    
  }
}
