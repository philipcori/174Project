import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';


const routes: Routes = [
  { path: 'admin-page', loadChildren: () => import(`./admin-page/admin-page.module`).then(m => m.AdminPageModule)},
  { path: 'survey-page', loadChildren: () => import(`./survey-page/survey-page.module`).then(m => m.SurveyPageModule)},
  { path: 'results-page', loadChildren: () => import(`./results-page/results-page.module`).then(m => m.ResultsPageModule)},
  { path: 'sections-page', loadChildren: () => import(`./section-page/section-page.module`).then(m => m.SectionPageModule)},
  { path: 'login', loadChildren: () => import(`./login-page/login-page.module`).then(m => m.LoginPageModule)},
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
