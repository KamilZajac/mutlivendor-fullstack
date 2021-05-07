import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthState, selectCurrentUser } from '@multivendor-fullstack/auth';
import { ProductEntityService } from '../../services/product-entity.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShopItemResponse, SimpleUser } from '@multivendor-fullstack/interfaces';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProductsComponent implements OnInit {
  $products: Observable<ShopItemResponse[]>;
  $me: Observable<SimpleUser>;
  constructor(
    private authStore: Store<AuthState>,
    private productsService: ProductEntityService
  ) { }

  ngOnInit(): void {
    this.$products = this.productsService.entities$
    this.$me = this.authStore.select(selectCurrentUser);
  }

  public productUpdated(entity: ShopItemResponse) {
    this.productsService.update(entity)
  }
}
