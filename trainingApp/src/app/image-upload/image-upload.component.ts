import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../super-admin.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
imageFile:any;
responseData:any;
  constructor(private superAdmin:SuperAdminService) { }

  ngOnInit(): void {
  }

  onFileSelected(event:any){
    this.imageFile =event.target.files[0];
    console.log(event.target.files[0]);
    
   
    
  }

  uploadImage(){
    this.superAdmin.imageUpload(this.imageFile).subscribe(data=>{
      this.responseData = JSON.parse(data);
      alert(this.responseData.message);
      let employee = JSON.parse(sessionStorage.getItem('login') as any);
       employee['employee'].profilePic=this.responseData.url;
       sessionStorage.setItem('login',JSON.stringify(employee));

      
    },(error)=>{
      console.log(error);
      
      alert(error.error);
    })
  }

}
