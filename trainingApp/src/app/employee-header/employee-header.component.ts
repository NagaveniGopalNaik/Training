import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
@Component({
  selector: 'app-employee-header',
  templateUrl: './employee-header.component.html',
  styleUrls: ['./employee-header.component.css']
})
export class EmployeeHeaderComponent implements OnInit {
hidden=false;
hiddenOption=false;
  constructor(private router:Router, private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  notification(){
this.router.navigate(['/notifications'])
  }

  back(){
this.router.navigate(['/employee']);
  }

  displayOption(){
    this.hiddenOption=true;
  }

  addPhoto(){
    this.hiddenOption=false;
    this.dialog.open(ImageUploadComponent,{panelClass:'image-upload'})
  }
  viewProfile(){
    this.hiddenOption=false;
    this.router.navigate(['/profile']);
  }
  logout(){
    this.hiddenOption=false;
    this.router.navigate(['/login']);
  }

  
}
