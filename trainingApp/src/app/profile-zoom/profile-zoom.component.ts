import { Component, OnInit } from '@angular/core';
import { SuperAdminService } from '../super-admin.service';

@Component({
  selector: 'app-profile-zoom',
  templateUrl: './profile-zoom.component.html',
  styleUrls: ['./profile-zoom.component.css']
})
export class ProfileZoomComponent implements OnInit {
image:any;
  constructor(private superAdmin:SuperAdminService) { }

  ngOnInit(): void {
    this.superAdmin.getLoginRole();
    let data = this.superAdmin.loginData;
    this.image = data['employee']?.profilePic || '/assets/profile.png';
  }

}
