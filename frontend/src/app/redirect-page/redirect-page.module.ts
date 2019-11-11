import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RedirectPageRoutingModule } from './redirect-page-routing.module';
import { RedirectHomepageComponent } from './redirect-homepage/redirect-homepage.component';


@NgModule({
  declarations: [RedirectHomepageComponent],
  imports: [
    CommonModule,
    RedirectPageRoutingModule
  ]
})
export class RedirectPageModule { }
