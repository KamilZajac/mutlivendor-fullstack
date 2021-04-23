import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { SimpleUser } from '@multivendor-fullstack/interfaces';

@Injectable()
export class UserEntityService extends EntityCollectionServiceBase<SimpleUser> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('User', serviceElementsFactory);
  }
}

