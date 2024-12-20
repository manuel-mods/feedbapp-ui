import { Routes } from '@angular/router';
import { ShellComponent } from '../../core/shell/shell.component';

export const routes: Routes = [
  {
    path: '',
    // component: ShellComponent,
    children: [
      {
        path: 'form/:id',
        loadComponent: () => import('./pages/form/form.component').then((c) => c.FormComponent),
      },
      {
        path: 'profile/:id',
        loadComponent: () =>
          import('./pages/profile/profile.component').then((c) => c.ProfileComponent),
      },
    ],
  },
];
