import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { CloudinaryModule } from '@cloudinary/ng';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CloudinaryModule,
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
