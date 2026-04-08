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
];
