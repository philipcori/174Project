import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';


const routes: Routes = [
  { path: 'admin-page', loadChildren: `./admin-page/admin-page.module#AdminPageModule`},
  { path: 'survey-page', loadChildren: `./survey-page/survey-page.module#SurveyPageModule`},
  { path: 'results-page', loadChildren: `./results-page/results-page.module#ResultsPageModule`},
  { path: 'sections-page', loadChildren: `./section-page/section-page.module#SectionPageModule`},
  { path: 'login', loadChildren: `./login-page/login-page.module#LoginPageModule`},
  { path: '', redirectTo: "/login", pathMatch: "full"},
  { path: '**', redirectTo: "/login"},
];

const config: ExtraOptions = {
  onSameUrlNavigation: 'reload'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
