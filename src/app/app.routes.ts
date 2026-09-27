import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/feed/feed-component/feed-component').then((m) => m.FeedComponent),
  },
  {
    path: 'post/:id',
    loadComponent: () =>
      import('./pages/post/post-component/post-component').then((m) => m.PostComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login-component/login-component').then((m) => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/signup/signup-component/signup-component').then((m) => m.SignupComponent),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/user-profile-component/user-profile-component').then(
        (m) => m.ProfileComponent,
      ),
  },
];
