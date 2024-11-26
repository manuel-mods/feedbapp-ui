import { Routes } from '@angular/router';
import { TitleService } from './core/services/title.service';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then((m) => m.routes),
  },
  {
    path: 'feedback',
    loadChildren: () => import('./features/feedback/feedback.routes').then((m) => m.routes),
  },
  {
    path: 'public',
    loadChildren: () =>
      import('./features/feedback-public/feedback-public.routes').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
];
