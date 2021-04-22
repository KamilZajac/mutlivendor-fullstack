import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleUserComponent } from './components/single-user/single-user.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUsers from './+state/users.reducer';
import { UsersEffects } from './+state/users.effects';
import { UsersComponent } from './containers/users/users.component';
import { Route } from '@angular/router';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export const usersRoutes: Route[] = [
  { path: '', component: UsersComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FlexModule,
    FlexLayoutModule,
    StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.reducer),
    EffectsModule.forFeature([UsersEffects]),
    MatListModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  declarations: [UsersComponent, SingleUserComponent],
})
export class AdminUsersModule {}
