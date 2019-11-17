import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionPageRoutingModule } from './section-page-routing.module';
import { SectionsHomepageComponent } from './sections-homepage/sections-homepage.component';


@NgModule({
  declarations: [SectionsHomepageComponent],
  imports: [
    CommonModule,
    SectionPageRoutingModule
  ]
})
export class SectionPageModule { }
