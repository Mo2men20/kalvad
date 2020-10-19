import { Product } from '../models/product.model';
import { ProductsActionsUnion, ProductsActionTypes } from './products.actions';
import * as App from '../../../app.module';
import { createSelector } from '@ngrx/store';
import { ProductComponent } from '../components/product/product.component';

export interface State extends App.State {
  products: ProductsState;
}

interface ProductsState {
  data: Product[];
  cart: Product[];
  errorMessage: string;
}

export const initialState: ProductsState = {
  data: [],
  cart: [],
  errorMessage: ''
};

export function reducer(
  state: ProductsState = initialState,
  action: ProductsActionsUnion
): ProductsState {
  switch (action.type) {
    case ProductsActionTypes.GET_ALL:
      return {
        ...state
      };

    case ProductsActionTypes.Get_ALL_SUCCESS:
      return {
        ...state,
        data: action.payload as Product[],
        errorMessage: ''
      };

    case ProductsActionTypes.ADD_TO_CART:
      return {
        ...state
      };

    case ProductsActionTypes.ADD_TO_CART_SUCCESS: {

      let clonedState:ProductsState = cloneState(state);
      let product = getProductToUpdate(state,action.payload as number);

      clonedState.cart.push(product);

      return clonedState;
    }

    case ProductsActionTypes.REMOVE_FROM_CART:
      return {
        ...state
      };

    case ProductsActionTypes.REMOVE_FROM_CART_SUCCESS: {

      let clonedState:ProductsState = cloneState(state);
      let index = getProductIndex(state,action.payload as number);

      clonedState.cart.splice(index,1)

      return clonedState;
    }

    case ProductsActionTypes.SERVER_ERROR:
      return {
        ...state,
        data: [],
        errorMessage: action.payload as string
      };
    default:
      return state;
  }
}

function getProductToUpdate(state: ProductsState, productId: number) {
  return state.data.find(p => p.id === productId);
}

function getProductIndex(state: ProductsState, productId: number) {
  return state.data.findIndex(p => p.id === productId);
}

function cloneState(source:ProductsState) : ProductsState{
  let state: ProductsState = {
    ...source,
    data : source.data.map(p => Object.assign({},p)),
    cart : source.cart.map(p => Object.assign({},p)),
  };

  return state;
}

export const selectProductsFeature = (state: State) => state.products;
export const selectProducts = createSelector(
  selectProductsFeature,
  (state: ProductsState) => state.data
);
export const selectCart = createSelector(
  selectProductsFeature,
  (state :ProductsState) => state.cart
);
