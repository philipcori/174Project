import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';


const routes: Routes = [
  { path: '', component: AdminHomepageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule { }
