import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Route, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { AdminUsersModule, UsersResolver, usersRoutes } from '@multivendor-fullstack/admin/users';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductsResolver, productsRoutes } from '@multivendor-fullstack/admin/products';


export const dashboardRoutes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'users', children: usersRoutes,
        resolve: {
          users: UsersResolver
        }
      },
      {
        path: 'products', children: productsRoutes,
        resolve: {
          products: ProductsResolver
        }
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
  ],
  providers: [
    UsersResolver, ProductsResolver
  ]
})
export class AdminDashboardModule {
}
