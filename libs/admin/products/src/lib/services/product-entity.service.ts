import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { ShopItemResponse } from '@multivendor-fullstack/interfaces';

@Injectable()
export class ProductEntityService extends EntityCollectionServiceBase<ShopItemResponse> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Product', serviceElementsFactory);
  }
}

