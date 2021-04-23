import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { SimpleUser } from '@multivendor-fullstack/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthState, selectCurrentUser } from '@multivendor-fullstack/auth';
import { UserEntityService } from '../../services/user-entity.service';

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
    private authStore: Store<AuthState>,
    private usersService: UserEntityService,
    private _snackBar: MatSnackBar
    ) {}

  ngOnInit(): void {
    this.$users = this.usersService.entities$
    this.$me = this.authStore.select(selectCurrentUser);
  }

  public updateUser(user: SimpleUser) {
    this.usersService.update(user)
  }

  public deleteUser(id: string) {
    this.usersService.delete(id)
  }
}
