import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Route, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { AdminUsersModule, usersRoutes } from '@multivendor-fullstack/admin/users';
import { FlexLayoutModule } from '@angular/flex-layout';

export const dashboardRoutes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'users', children: usersRoutes
      }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    AdminUsersModule,
    FlexLayoutModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class AdminDashboardModule {
}
