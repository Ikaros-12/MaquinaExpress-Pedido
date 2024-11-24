import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),

  },
  {
    path: 'pedido',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  }
];
