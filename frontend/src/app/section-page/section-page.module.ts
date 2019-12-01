import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionPageRoutingModule } from './section-page-routing.module';
import { SectionsHomepageComponent } from './sections-homepage/sections-homepage.component';
import { MatButtonModule } from '@angular/material';


@NgModule({
  declarations: [SectionsHomepageComponent],
  imports: [
    CommonModule,
    SectionPageRoutingModule,
    MatButtonModule
  ]
})
export class SectionPageModule { }
