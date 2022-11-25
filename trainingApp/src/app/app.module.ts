import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { LoginComponent } from './login/login.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { AdminComponent } from './admin/admin.component';
import { ManagerComponent } from './manager/manager.component';
import { EmployeeComponent } from './employee/employee.component';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginPageHeaderComponent } from './login-page-header/login-page-header.component';
import { OtpPageComponent } from './otp-page/otp-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TrainingCountComponent } from './training-count/training-count.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddEmployeeHeaderComponent } from './add-employee-header/add-employee-header.component';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { AllEmployeeComponent } from './all-employee/all-employee.component';
import { AssignEmployeeRoleComponent } from './assign-employee-role/assign-employee-role.component';
import { EmployeeHeaderComponent } from './employee-header/employee-header.component';
import { NotificationAlertMessagesComponent } from './notification-alert-messages/notification-alert-messages.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { RejectReasonComponent } from './reject-reason/reject-reason.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';  
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SuperAdminComponent,
    AdminComponent,
    ManagerComponent,
    EmployeeComponent,
    ChangePasswordComponent,
    LoginPageHeaderComponent,
    OtpPageComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TrainingCountComponent,
    NavbarComponent,
    AddEmployeeHeaderComponent,
    EmployeeRegisterComponent,
    AllEmployeeComponent,
    AssignEmployeeRoleComponent,
    EmployeeHeaderComponent,
    NotificationAlertMessagesComponent,
    ViewProfileComponent,
    RejectReasonComponent,
    ImageUploadComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    // FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
