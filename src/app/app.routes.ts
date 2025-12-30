import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [

  // 🔓 Blank layout (NO sidebar)
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home.component')
            .then(m => m.HomeComponent),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home.component')
            .then(m => m.HomeComponent),
      }
    ]
  },

  // 🔒 Admin layout (WITH sidebar)
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard/dashboard.component')
            .then(m => m.DashboardComponent),
      }
    ]
  },

  // optional fallback
  { path: '**', redirectTo: '' }
];


// export const routes: Routes = [
//   {
//     path: '',
//     component: AdminLayoutComponent,
//     children: [
//       {
//         path: '',
//         loadComponent: () =>
//           import('./features/home/home.component')
//             .then(m => m.HomeComponent),
//       },
//       {
//         path: 'home',
//         loadComponent: () =>
//           import('./features/home/home.component')
//             .then(m => m.HomeComponent),
//       },
//       {
//         path: 'dashboard',
//         loadComponent: () =>
//           import('./features/dashboard/dashboard/dashboard.component')
//             .then(m => m.DashboardComponent),
//       },
//       {
//         path: '',
//         redirectTo: 'dashboard',
//         pathMatch: 'full',
//       },
//     ],
//   },
// ];

