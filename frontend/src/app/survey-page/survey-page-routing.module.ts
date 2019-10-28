import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyHomepageComponent } from './survey-homepage/survey-homepage.component';


const routes: Routes = [
  { path: '', component: SurveyHomepageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyPageRoutingModule { }
