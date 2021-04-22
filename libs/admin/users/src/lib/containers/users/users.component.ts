import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as usersActions from '../../+state/users.actions';
import * as fromUsers from '../../+state/users.selectors';
import { AppState } from '../../+state/users.selectors';
import { Observable } from 'rxjs';
import { SimpleUser } from '@multivendor-fullstack/interfaces';
import { take, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthState, selectCurrentUser } from '@multivendor-fullstack/auth';

@Component({
  selector: 'multivendor-fullstack-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class UsersComponent implements OnInit {
  $users: Observable<SimpleUser[]>;
  $me: Observable<SimpleUser>;

  isUpdated: boolean;

  constructor(
    private usersStore: Store<AppState>,
    private authStore: Store<AuthState>,

    private _snackBar: MatSnackBar
    ) {}

  ngOnInit(): void {
    this.usersStore.dispatch(usersActions.init());
    this.$users = this.usersStore.select(fromUsers.selectAllUsers).pipe(tap(() => {
      if(this.isUpdated)
        this._snackBar.open('User updated!', null,{duration: 1000});
    }))

    this.$me = this.authStore.select(selectCurrentUser);
  }


  public updateUser(role: string, id: string) {
    this.isUpdated = true;
    this.usersStore.dispatch(usersActions.updateUser({id, role}))
  }
}
