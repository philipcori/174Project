import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyPageRoutingModule } from './survey-page-routing.module';
import { SurveyHomepageComponent } from './survey-homepage/survey-homepage.component';
import { MatButtonModule } from '@angular/material';


@NgModule({
  declarations: [SurveyHomepageComponent],
  imports: [
    CommonModule,
    SurveyPageRoutingModule,
    MatButtonModule
  ]
})
export class SurveyPageModule { }
