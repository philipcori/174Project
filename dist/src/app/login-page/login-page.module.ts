import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginHomepageComponent } from './login-homepage/login-homepage.component';


@NgModule({
  declarations: [LoginHomepageComponent],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    MatButtonModule
  ]
})
export class LoginPageModule { }
