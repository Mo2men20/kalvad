import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { State } from '../../store/products.reducers';
import * as ProductsReducers from '../../store/products.reducers';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  cart$:Observable<Product[]> = this.store.select(ProductsReducers.selectCart);

  constructor(
    public productsService: ProductsService,
    private store: Store<State>,
    private generalService: GeneralService
  ) {}

  private calculateTotal(products: Product[]): number {
    let sum = 0;
    products.forEach(p => (sum += p.quantity * p.price));
    return sum;
  }

  private placeOrder(products: Product[]): void {
    console.table(products);
    this.generalService.showSuccess('You order is placed.');
  }
}
