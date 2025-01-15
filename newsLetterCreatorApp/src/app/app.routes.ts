import { Routes } from '@angular/router';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SubscribersComponent } from './components/subscribers/subscribers.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: MainContentComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'subscribers', component: SubscribersComponent },
  // { path: 'settings', component: SettingsComponent },
];
