import { Injectable } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class ProductsEffects {
  @Effect()
  getProducts$: Observable<Action> = this.actions$.pipe(
    tap(console.log),
    ofType<ProductsActions.GetAll>(ProductsActions.ProductsActionTypes.GET_ALL),
    mergeMap(action =>
      this.productsService.getAllProducts().pipe(
        map(products => new ProductsActions.GetAllSuccess(products)),
        catchError(err => of(new ProductsActions.ServerError(err)))
      )
    )
  );

  @Effect()
  addToCart$: Observable<Action> = this.actions$.pipe(
    ofType<ProductsActions.AddToCart>(
      ProductsActions.ProductsActionTypes.ADD_TO_CART
    ),
    mergeMap(action =>
      this.productsService.addToCart(action.payload).pipe(
        map((id: number) => new ProductsActions.AddToCartSuccess(id)),
        catchError(err => of(new ProductsActions.ServerError(err)))
      )
    )
  );

  @Effect()
  removeFromCart$: Observable<Action> = this.actions$.pipe(
    ofType<ProductsActions.RemoveFromCart>(
      ProductsActions.ProductsActionTypes.REMOVE_FROM_CART
    ),
    mergeMap(action =>
      this.productsService.removeFromCart(action.payload).pipe(
        map((id: number) => new ProductsActions.RemoveFromCartSuccess(id)),
        catchError(err => of(new ProductsActions.ServerError(err)))
      )
    )
  );

  constructor(
    private productsService: ProductsService,
    private actions$: Actions
  ) {}
}
