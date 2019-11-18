import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { ResultsPageRoutingModule } from './results-page-routing.module';
import { ResultsHomepageComponent } from './results-homepage/results-homepage.component';


@NgModule({
  declarations: [ResultsHomepageComponent],
  imports: [
    CommonModule,
    ResultsPageRoutingModule,
    MatButtonModule
  ]
})
export class ResultsPageModule { }
