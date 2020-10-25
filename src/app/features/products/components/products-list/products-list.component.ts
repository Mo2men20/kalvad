import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsService } from '../../services/products.service';
import { State } from '../../store/products.reducers';
import * as ProductsActions from '../../store/products.actions';
import * as ProductsReducers from '../../store/products.reducers';
import { combineLatest, Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products$: Observable<Product[]> = combineLatest([
    this.store.select(ProductsReducers.selectProducts),
    this.store.select(ProductsReducers.selectCart)
  ]).pipe(
    map(([source, cart]) => {
      //clone source
      let clonedSource: Product[] = source.map(s => Object.assign({}, s));

      for (let index = 0; index < clonedSource.length; index++) {
        const element = clonedSource[index];

        if (cart.findIndex(p => p.id === element.id) !== -1) {
          element.inCart = true;
        } else {
          element.inCart = false;
        }
      }
      return clonedSource;
    })
  );

  constructor(
    public productsService: ProductsService,
    private store: Store<State>
  ) {}
  ngOnInit(): void {
    this.store.dispatch(new ProductsActions.GetAll({}));
  }
}
