import { TestBed } from '@angular/core/testing';

import { ShopItemsService } from './shop-items.service';

describe('ShopItemsService', () => {
  let service: ShopItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
