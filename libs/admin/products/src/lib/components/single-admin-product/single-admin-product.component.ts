import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ShopItemResponse, SimpleUser } from '@multivendor-fullstack/interfaces';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'single-admin-product',
  templateUrl: './single-admin-product.component.html',
  styleUrls: ['./single-admin-product.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SingleAdminProductComponent implements OnInit {
  @Input() product: ShopItemResponse;
  @Output() productUpdated = new EventEmitter<ShopItemResponse>()


  constructor() { }

  ngOnInit(): void {
  }

  public onDeleteClicked() {

  }

  public onStatusChange(event: MatSelectChange) {
    const updatedProd: ShopItemResponse = {
      ...this.product,
      status: event.value
    }

    this.productUpdated.emit(updatedProd)
  }
}
