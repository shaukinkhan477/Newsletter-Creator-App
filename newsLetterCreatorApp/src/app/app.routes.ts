import { Routes } from '@angular/router';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { MainContentComponent } from './components/main-content/main-content.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainContentComponent },
  { path: 'analytics', component: AnalyticsComponent },
  // { path: 'subscribers', component: SubscribersComponent },
  // { path: 'settings', component: SettingsComponent },
];
