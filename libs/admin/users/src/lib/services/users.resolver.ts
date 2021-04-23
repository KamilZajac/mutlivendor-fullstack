import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserEntityService } from './user-entity.service';
import { filter, first, tap } from 'rxjs/operators';

@Injectable()
export class UsersResolver implements Resolve<boolean> {
  constructor(private usersService: UserEntityService) {
  }
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.usersService.loaded$.pipe(
      tap(loaded => {
        if(!loaded) {
          this.usersService.getAll();
        }
      }),
      filter(loaded => !!loaded),
      first()
    )
  }
}
