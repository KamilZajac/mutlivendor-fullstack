import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ProductsComponent } from './containers/products/products.component';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { UserDataService } from '../../../users/src/lib/services/user-data.service';
import { ProductEntityService } from './services/product-entity.service';
import { ProductDataService } from './services/product-data.service';
import { ProductsResolver } from './services/products.resolver';
import { SingleAdminProductComponent } from './components/single-admin-product/single-admin-product.component';
import { FlexModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

export const productsRoutes: Route[] = [
  { path: '', component: ProductsComponent },
];

export const entityMetadata: EntityMetadataMap = {
  Product: {}
}


@NgModule({
  imports: [
    CommonModule,
    FlexModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  declarations: [ProductsComponent, SingleAdminProductComponent],
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
