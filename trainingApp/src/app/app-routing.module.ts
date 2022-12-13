import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';

import { ChangePasswordComponent } from './change-password/change-password.component';

import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CreateTrainingComponent } from './create-training/create-training.component';

import { EmployeeRegisterComponent } from './employee-register/employee-register.component';

import { InviteEmpComponent } from './invite-emp/invite-emp.component';
import { DetailsPageComponent } from './details-page/details-page.component';

import { NotificationAlertMessagesComponent } from './notification-alert-messages/notification-alert-messages.component';
import { RejectReasonComponent } from './reject-reason/reject-reason.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

import { InviteReporteesComponent } from './invite-reportees/invite-reportees.component';

import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';

import { UpdateTrainingComponent } from './update-training/update-training.component';

import { AssignManagerComponent } from './assign-manager/assign-manager.component';
import { AssignReporteesComponent } from './assign-reportees/assign-reportees.component';
const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:"full"},
 
  {path:'editProfile',component:EditProfileComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:SuperAdminComponent},

  {path:'change-password',component:ChangePasswordComponent},

  {path:'createTraining',component:CreateTrainingComponent},
  {path:'updateTraining',component:UpdateTrainingComponent},
 {path:'assign-reportees',component:AssignReporteesComponent},
  {path:'registerEmployee',component:EmployeeRegisterComponent},
  {path:'assign-manager',component:AssignManagerComponent},
  {path:'inviteEmp',component:InviteEmpComponent},

  {path:'detailsPage',component:DetailsPageComponent},

  {path:'inviteReportees',component:InviteReporteesComponent},
  // {path:'detailsPage',component:DetailsPageComponent},



  {path:'notifications',component:NotificationAlertMessagesComponent},
  {path:'reject-reason',component:RejectReasonComponent},
  {path:'profile',component:ViewProfileComponent},
  {
    path:'delete-multi-employee',component:DeleteEmployeeComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
