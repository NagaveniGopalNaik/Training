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
import { FormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginPageHeaderComponent } from './login-page-header/login-page-header.component';
import { OtpPageComponent } from './otp-page/otp-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TrainingCountComponent } from './training-count/training-count.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddProfileComponent } from './add-profile/add-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CreateTrainingComponent } from './create-training/create-training.component';  


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TrainingCountComponent,
    NavbarComponent,
    LoginComponent,
    SuperAdminComponent,
    AdminComponent,
    ManagerComponent,
    EmployeeComponent,
    ChangePasswordComponent,
    LoginPageHeaderComponent,
    OtpPageComponent,
    AddProfileComponent,
    EditProfileComponent,
    CreateTrainingComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
