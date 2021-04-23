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
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { UserEntityService } from './services/user-entity.service';
import { UserDataService } from './services/user-data.service';
import { UsersResolver } from './services/users.resolver';
import { MatButtonModule } from '@angular/material/button';


export const entityMetadata: EntityMetadataMap = {
  User: {}
}

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
    MatSnackBarModule,
    MatButtonModule
  ],
  declarations: [UsersComponent, SingleUserComponent],
  providers: [UserEntityService, UserDataService, UsersResolver]
})
export class AdminUsersModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private userDataService: UserDataService
    ) {
    eds.registerMetadataMap(entityMetadata)
    entityDataService.registerService('User', userDataService)
  }
}
