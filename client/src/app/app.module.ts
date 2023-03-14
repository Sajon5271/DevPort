import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WebViewComponent } from './pages/web-view/web-view.component';
import { HrClientComponent } from './pages/hr-client/hr-client.component';
import { BasicInfoDashboardComponent } from './components/dashboard-components/basic-info-dashboard/basic-info-dashboard.component';
import { EducationsDashboardComponent } from './components/dashboard-components/educations-dashboard/educations-dashboard.component';
import { ExperiencesDashboardComponent } from './components/dashboard-components/experiences-dashboard/experiences-dashboard.component';
import { ProjectsDashboardComponent } from './components/dashboard-components/projects-dashboard/projects-dashboard.component';
import { SidenavComponent } from './components/dashboard-components/sidenav/sidenav.component';
import { UserAccountsDashboardComponent } from './components/dashboard-components/user-accounts-dashboard/user-accounts-dashboard.component';
import { LoginComponent } from './pages/signin/login/login.component';
import { SignupComponent } from './pages/signin/signup/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingComponent } from './pages/landing/landing.component';
import { DashboardComponentsComponent } from './components/dashboard-components/dashboard-components.component';
import { HrClientComponentsComponent } from './components/hr-client-components/hr-client-components.component';
import { WebViewComponentsComponent } from './components/web-view-components/web-view-components.component';
import { CustombuttonComponent } from './components/custombutton/custombutton.component';
import { GithubLoginComponent } from './github-login/github-login.component';
import { LinkedInLoginComponent } from './linked-in-login/linked-in-login.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoadingInterceptor } from './loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WebViewComponent,
    HrClientComponent,
    BasicInfoDashboardComponent,
    EducationsDashboardComponent,
    ExperiencesDashboardComponent,
    ProjectsDashboardComponent,
    SidenavComponent,
    UserAccountsDashboardComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    LandingComponent,
    DashboardComponentsComponent,
    HrClientComponentsComponent,
    WebViewComponentsComponent,
    CustombuttonComponent,
    GithubLoginComponent,
    LinkedInLoginComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
