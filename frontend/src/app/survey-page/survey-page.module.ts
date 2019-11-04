import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyPageRoutingModule } from './survey-page-routing.module';
import { SurveyHomepageComponent } from './survey-homepage/survey-homepage.component';
import { MatButtonModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SurveyHomepageComponent],
  imports: [
    CommonModule,
    SurveyPageRoutingModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    FormsModule
  ]
})
export class SurveyPageModule { }
