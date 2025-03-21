import { Routes } from '@angular/router';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SubscribersComponent } from './components/subscribers/subscribers.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { AuthGuard } from './AuthGuards/auth.guard';
import { PostsComponent } from './components/posts/posts.component';
import { TemplatesComponent } from './components/templates/templates.component';
import { HomeComponent } from './components/home/home.component';
import { ResumeComponent } from './components/resume/resume.component';
import { OAuthCallbackComponent } from './auth/oauth-callback.component';
import { DragAndDropComponent } from './components/drag-and-drop/drag-and-drop.component';


export const routes: Routes = [
  { path: '', redirectTo: '/homePage', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'oauth-callback', component: OAuthCallbackComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
    canActivate: [AuthGuard],
  },
  { path: 'homePage', component: HomeComponent },
  { path: 'home', component: MainContentComponent, canActivate: [AuthGuard] },
  { path: 'resume', component: ResumeComponent, canActivate: [AuthGuard] },
  {
    path: 'dragAndDrop',
    component: DragAndDropComponent,
    canActivate: [AuthGuard],
  },
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard] },
  {
    path: 'edit-post/:id',
    component: MainContentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'subscribers',
    component: SubscribersComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'templates',
    component: TemplatesComponent,
    canActivate: [AuthGuard],
  },

  // { path: 'settings', component: SettingsComponent,canActivate: [AuthGuard] },
];
