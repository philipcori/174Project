import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RedirectHomepageComponent } from './redirect-homepage/redirect-homepage.component';


const routes: Routes = [
  { path: '', component: RedirectHomepageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedirectPageRoutingModule { }
