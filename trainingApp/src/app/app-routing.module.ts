import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { AdminComponent } from './admin/admin.component';
import { ManagerComponent } from './manager/manager.component';
import { EmployeeComponent } from './employee/employee.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { HeaderComponent } from './header/header.component';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CreateTrainingComponent } from './create-training/create-training.component';

import { EmployeeRegisterComponent } from './employee-register/employee-register.component';

import { InviteEmpComponent } from './invite-emp/invite-emp.component';
import { DetailsPageComponent } from './details-page/details-page.component';

import { NotificationAlertMessagesComponent } from './notification-alert-messages/notification-alert-messages.component';
import { RejectReasonComponent } from './reject-reason/reject-reason.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ManagerTrainingDetailsComponent } from './manager-training-details/manager-training-details.component';
import { InviteReporteesComponent } from './invite-reportees/invite-reportees.component';

import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';

import { UpdateTrainingComponent } from './update-training/update-training.component';


const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:"full"},
  {path:'header',component:HeaderComponent},
  {path:'addProfile',component:AddProfileComponent},
  {path:'editProfile',component:EditProfileComponent},
  {path:'login',component:LoginComponent},
  {path:'superAdmin',component:SuperAdminComponent},
  {path:'admin',component:AdminComponent},
  {path:'manager',component:ManagerComponent},
  {path:'employee',component:EmployeeComponent},
  {path:'change-password',component:ChangePasswordComponent},

  {path:'createTraining',component:CreateTrainingComponent},
  {path:'updateTraining',component:UpdateTrainingComponent},

  {path:'registerEmployee',component:EmployeeRegisterComponent},

  {path:'inviteEmp',component:InviteEmpComponent},

  {path:'detailsPage',component:DetailsPageComponent},

  {path:'inviteReportees',component:InviteReporteesComponent},
  {path:'detailsPage',component:DetailsPageComponent},
  {path:'managerTrainingDetails',component:ManagerTrainingDetailsComponent},


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
