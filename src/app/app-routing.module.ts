import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'payments',
    loadChildren: () => import('./payments/payments.module').then((m) => m.PaymentsModule),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
