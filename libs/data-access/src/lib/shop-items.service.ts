import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShopItemResponse } from '@multivendor-fullstack/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopItemsService {

  constructor(private http: HttpClient) {
  }

  fetchAllShopItems(): Observable<ShopItemResponse[]> {
    return this.http.get<ShopItemResponse[]>('http://localhost:3333/api/shop-item')
  }
}
