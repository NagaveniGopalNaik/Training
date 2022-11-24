import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { AdminComponent } from './admin/admin.component';
import { ManagerComponent } from './manager/manager.component';
import { EmployeeComponent } from './employee/employee.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:"full"},
  {path:'login',component:LoginComponent},
  {path:'superAdmin',component:SuperAdminComponent},
  {path:'admin',component:AdminComponent},
  {path:'manager',component:ManagerComponent},
  {path:'employee',component:EmployeeComponent},
  {path:'change-password',component:ChangePasswordComponent},
  {path:'registerEmployee',component:EmployeeRegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
