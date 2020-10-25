import { Component, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { State } from '../../store/products.reducers';
import * as ProductsActions from '../../store/products.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: Product;
  @Input() isForCart: boolean;
  constructor(
    public productsService: ProductsService,
    private store: Store<State>
  ) {}

  private quantityChanged(product: Product, event: MatSelectChange): void {
    this.productsService.changeQuantity(product, event.value);
  }

  private addToCart(product: Product): void {
    this.store.dispatch(new ProductsActions.AddToCart(product.id));
  }

  private removeFromCart(product: Product): void {
    this.store.dispatch(new ProductsActions.RemoveFromCart(product.id));
  }
}
