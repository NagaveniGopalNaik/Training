import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { LoginComponent } from './login/login.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';

 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginPageHeaderComponent } from './login-page-header/login-page-header.component';
import { OtpPageComponent } from './otp-page/otp-page.component';

import { FooterComponent } from './footer/footer.component';
import { TrainingCountComponent } from './training-count/training-count.component';
import { NavbarComponent } from './navbar/navbar.component';

import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CreateTrainingComponent } from './create-training/create-training.component';  


import { EmployeeRegisterComponent } from './employee-register/employee-register.component';

import { AssignEmployeeRoleComponent } from './assign-employee-role/assign-employee-role.component';

import { InviteEmpComponent } from './invite-emp/invite-emp.component';
import { DetailsPageComponent } from './details-page/details-page.component';

import { EmployeeHeaderComponent } from './employee-header/employee-header.component';
import { NotificationAlertMessagesComponent } from './notification-alert-messages/notification-alert-messages.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { RejectReasonComponent } from './reject-reason/reject-reason.component';

// import { ImageUploadComponent } from './image-upload/image-upload.component';  
import { HttpClientModule } from '@angular/common/http';

import { ImageUploadComponent } from './image-upload/image-upload.component';

import { InviteReporteesComponent } from './invite-reportees/invite-reportees.component';

// import { AdminTrainingDetailsComponent } from './admin-training-details/admin-training-details.component';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';  

import { UpdateTrainingComponent } from './update-training/update-training.component';
import { DateChangePipe,DurationPipe,TimePipe,EndsInPipe} from './date.pipe';

import { ProfileZoomComponent } from './profile-zoom/profile-zoom.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { AssignManagerComponent } from './assign-manager/assign-manager.component';
import { AssignReporteesComponent } from './assign-reportees/assign-reportees.component';  


// import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
@NgModule({
  declarations: [
    AppComponent,
   
    FooterComponent,
    TrainingCountComponent,
    NavbarComponent,
    LoginComponent,
    SuperAdminComponent,
    
   
   
    ChangePasswordComponent,
    LoginPageHeaderComponent,
    OtpPageComponent,
    
    EditProfileComponent,
    CreateTrainingComponent,
   

    FooterComponent,
    TrainingCountComponent,
    NavbarComponent,
    
    EmployeeRegisterComponent,
   
    AssignEmployeeRoleComponent,

    InviteEmpComponent,
    DetailsPageComponent,

    EmployeeHeaderComponent,
    NotificationAlertMessagesComponent,
    ViewProfileComponent,
    RejectReasonComponent,
    ImageUploadComponent,

    InviteReporteesComponent,

    // AdminTrainingDetailsComponent,
    ErrorMessagesComponent,
    DeleteEmployeeComponent,

// AdminTrainingDetailsComponent,
    UpdateTrainingComponent,
 DateChangePipe,
 TimePipe,
 DurationPipe,
 EndsInPipe,

 ProfileZoomComponent,
 NotificationListComponent,
 AssignManagerComponent,
 AssignReporteesComponent
 



    // NgxMaterialTimepickerModule



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule
    // FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
