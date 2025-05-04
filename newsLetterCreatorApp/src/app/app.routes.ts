import { Routes } from '@angular/router';
import { AuthGuard } from './AuthGuards/auth.guard';



export const routes: Routes = [
  { path: '', redirectTo: '/homePage', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'oauth-callback',
    loadComponent: () =>
      import('./auth/oauth-callback.component').then(
        (m) => m.OAuthCallbackComponent
      ),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./auth/signup/signup.component').then((m) => m.SignupComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./auth/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./auth/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'reset-password/:token',
    loadComponent: () =>
      import('./auth/reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'homePage',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/main-content/main-content.component').then(
        (m) => m.MainContentComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'resume',
    loadComponent: () =>
      import('./components/resume/resume.component').then(
        (m) => m.ResumeComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'dragAndDrop',
    loadComponent: () =>
      import('./components/drag-and-drop/drag-and-drop.component').then(
        (m) => m.DragAndDropComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./components/posts/posts.component').then(
        (m) => m.PostsComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-post/:id',
    loadComponent: () =>
      import('./components/main-content/main-content.component').then(
        (m) => m.MainContentComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'analytics',
    loadComponent: () =>
      import('./components/analytics/analytics.component').then(
        (m) => m.AnalyticsComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'subscribers',
    loadComponent: () =>
      import('./components/subscribers/subscribers.component').then(
        (m) => m.SubscribersComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'templates',
    loadComponent: () =>
      import('./components/templates/templates.component').then(
        (m) => m.TemplatesComponent
      ),
    canActivate: [AuthGuard],
  },

  // { path: 'settings', component: SettingsComponent,canActivate: [AuthGuard] },
];
