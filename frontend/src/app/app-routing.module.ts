import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'admin-page', loadChildren: () => import(`./admin-page/admin-page.module`).then(m => m.AdminPageModule)},
  { path: 'survey-page', loadChildren: () => import(`./survey-page/survey-page.module`).then(m => m.SurveyPageModule)},
  { path: 'results-page', loadChildren: () => import(`./results-page/results-page.module`).then(m => m.ResultsPageModule)},
  { path: 'login-page', loadChildren: () => import(`./login-page/login-page.module`).then(m => m.LoginPageModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
