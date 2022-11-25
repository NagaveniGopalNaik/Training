import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { AdminComponent } from './admin/admin.component';
import { ManagerComponent } from './manager/manager.component';
import { EmployeeComponent } from './employee/employee.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { NotificationAlertMessagesComponent } from './notification-alert-messages/notification-alert-messages.component';
import { RejectReasonComponent } from './reject-reason/reject-reason.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:"full"},
  {path:'login',component:LoginComponent},
  {path:'superAdmin',component:SuperAdminComponent},
  {path:'admin',component:AdminComponent},
  {path:'manager',component:ManagerComponent},
  {path:'employee',component:EmployeeComponent},
  {path:'change-password',component:ChangePasswordComponent},
  {path:'registerEmployee',component:EmployeeRegisterComponent},
  {path:'notifications',component:NotificationAlertMessagesComponent},
  {path:'reject-reason',component:RejectReasonComponent},
  {path:'profile',component:ViewProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
