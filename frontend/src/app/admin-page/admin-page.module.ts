import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { MatButtonModule } from '@angular/material';


@NgModule({
  declarations: [AdminHomepageComponent],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    MatButtonModule
  ]
})
export class AdminPageModule { }
