import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { GithubLoginComponent } from './github-login/github-login.component';
import { LinkedInLoginComponent } from './linked-in-login/linked-in-login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HrClientComponent } from './pages/hr-client/hr-client.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/signin/login/login.component';
import { SignupComponent } from './pages/signin/signup/signup/signup.component';
import { WebViewComponent } from './pages/web-view/web-view.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'hr', component: HrClientComponent },
  // {path: 'web-view', component: WebViewComponent},
  { path: 'web-view/:id', component: WebViewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'githubLogin', component: GithubLoginComponent },
  { path: 'linkedInLogin', component: LinkedInLoginComponent },
  { path: '', component: LandingComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
