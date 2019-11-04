import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPageModule } from './admin-page/admin-page.module';
import { ResultsPageModule } from './results-page/results-page.module';
import { SurveyPageModule } from './survey-page/survey-page.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTransferService } from "src/app/data-transfer.service"
import { LoginPageModule } from './login-page/login-page.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminPageModule,
    ResultsPageModule,
    SurveyPageModule,
    LoginPageModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [DataTransferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
