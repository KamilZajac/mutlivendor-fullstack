import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorefrontComponent } from './containers/storefront/storefront.component';
import { RouterModule } from '@angular/router';
import { ProductGridComponent } from './components/product-grid/product-grid.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: StorefrontComponent
      }
    ])
  ],
  declarations: [
    StorefrontComponent,
    ProductGridComponent
  ],
})
export class ClientStorefrontModule {}
