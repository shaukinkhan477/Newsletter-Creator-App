import { Routes } from '@angular/router';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SubscribersComponent } from './components/subscribers/subscribers.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: 'home', component: MainContentComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'subscribers', component: SubscribersComponent },
  // { path: 'settings', component: SettingsComponent },
];
