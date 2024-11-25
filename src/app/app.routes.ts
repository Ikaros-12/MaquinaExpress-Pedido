import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),

  },
  {
    path: 'pedido/:url',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'pedido/:url/:status',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  }
];
