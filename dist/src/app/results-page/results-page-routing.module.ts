import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultsHomepageComponent } from './results-homepage/results-homepage.component';


const routes: Routes = [
  { path: '', component: ResultsHomepageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsPageRoutingModule { }
