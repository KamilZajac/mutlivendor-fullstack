import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ProductsComponent } from './containers/products/products.component';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { UserDataService } from '../../../users/src/lib/services/user-data.service';
import { ProductEntityService } from './services/product-entity.service';
import { ProductDataService } from './services/product-data.service';
import { ProductsResolver } from './services/products.resolver';

export const productsRoutes: Route[] = [
  { path: '', component: ProductsComponent },
];

export const entityMetadata: EntityMetadataMap = {
  Product: {}
}


@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [ProductEntityService, ProductDataService, ProductsResolver]

})
export class AdminProductsModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private productDataService: ProductDataService
  ) {
    eds.registerMetadataMap(entityMetadata)
    entityDataService.registerService('Product', productDataService)
  }
}
