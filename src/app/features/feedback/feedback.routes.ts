import { Routes } from '@angular/router';
import { ShellComponent } from '../../core/shell/shell.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'history',
        loadComponent: () =>
          import('./pages/history/history.component').then(
            (c) => c.HistoryComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.component').then(
            (c) => c.ProfileComponent
          ),
      },
      {
        path: 'config',
        loadComponent: () =>
          import('./pages/config/config.component').then(
            (c) => c.ConfigComponent
          ),
      },
    ],
  },
];
