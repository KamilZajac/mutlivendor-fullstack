import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorefrontComponent } from './storefront/storefront.component';
import { RouterModule } from '@angular/router';

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
    StorefrontComponent
  ],
})
export class ClientStorefrontModule {}
