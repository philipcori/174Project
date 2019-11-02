import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';


@NgModule({
  declarations: [AdminHomepageComponent],
  imports: [
    CommonModule,
    AdminPageRoutingModule
  ]
})
export class AdminPageModule { }
