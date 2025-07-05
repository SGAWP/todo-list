import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    loadComponent: () => import('./pages/tasks/tasks').then((c) => c.Tasks),
  },
  {
    path: 'tasks/:id',
    loadComponent: () => import('./pages/task/task').then((c) => c.Task),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found').then((c) => c.NotFound),
  },
];
