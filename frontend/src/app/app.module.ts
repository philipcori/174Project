import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPageModule } from './admin-page/admin-page.module';
import { ResultsPageModule } from './results-page/results-page.module';
import { SurveyPageModule } from './survey-page/survey-page.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminPageModule,
    ResultsPageModule,
    SurveyPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
