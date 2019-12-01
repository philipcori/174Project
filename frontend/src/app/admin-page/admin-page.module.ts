import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdminHomepageComponent],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule
  ]
})
export class AdminPageModule { }
