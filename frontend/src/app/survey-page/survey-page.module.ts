import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyPageRoutingModule } from './survey-page-routing.module';
import { SurveyHomepageComponent } from './survey-homepage/survey-homepage.component';


@NgModule({
  declarations: [SurveyHomepageComponent],
  imports: [
    CommonModule,
    SurveyPageRoutingModule
  ]
})
export class SurveyPageModule { }
