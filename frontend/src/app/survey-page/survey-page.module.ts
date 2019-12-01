import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyPageRoutingModule } from './survey-page-routing.module';
import { SurveyHomepageComponent } from './survey-homepage/survey-homepage.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { IncompleteModalComponent } from './incomplete-modal/incomplete-modal.component';


@NgModule({
  declarations: [
    SurveyHomepageComponent,
    IncompleteModalComponent
  ],
  imports: [
    CommonModule,
    SurveyPageRoutingModule,
    MatButtonModule,
    MatRadioModule,
    MatInputModule,
    FormsModule,
    MatDialogModule
  ],
  entryComponents: [IncompleteModalComponent]
})
export class SurveyPageModule { }
