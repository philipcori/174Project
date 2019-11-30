import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectionsHomepageComponent } from './sections-homepage/sections-homepage.component';


const routes: Routes = [
  { path: '', component: SectionsHomepageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionPageRoutingModule { }
