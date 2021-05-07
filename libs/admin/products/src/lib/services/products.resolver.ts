import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { ProductEntityService } from './product-entity.service';

@Injectable()
export class ProductsResolver implements Resolve<boolean> {
  constructor(private productsService: ProductEntityService) {
  }
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.productsService.loaded$.pipe(
      tap(loaded => {
        console.log('PRODUCT RESOLVER TAp');
        console.log(loaded)
        if(!loaded) {
          this.productsService.getAll();
        }
      }),
      filter(loaded => !!loaded),
      first()
    )
  }
}
