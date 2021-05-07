import { Inject, Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { ShopItemResponse } from '@multivendor-fullstack/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';

@Injectable()
export class ProductDataService extends DefaultDataService<ShopItemResponse>{
  constructor(public http: HttpClient,
              httpUrlGenerator: HttpUrlGenerator,
              @Inject('apiURL') private apiURL: string ) {
    super('Product', http, httpUrlGenerator);
  }

  public getAll(): Observable<ShopItemResponse[]> {
    console.log('ajsfasfalkjsf')
    return this.http.get<ShopItemResponse[]>(this.apiURL + '/shop-item')
  }
  public update(update: Update<ShopItemResponse>): Observable<ShopItemResponse> {
    const {name, price, status, description} = update.changes
    return this.http.patch<ShopItemResponse>(this.apiURL + '/shop-item/' + update.changes.id, {name, price, status, description})
  }
  public delete(id: string): Observable<string> {
    return this.http.delete<string>(this.apiURL + '/shop-item/' + id)
  }
}


