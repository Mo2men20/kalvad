import {Action} from '@ngrx/store';
import { Product } from '../models/product.model';

export enum ProductsActionTypes{
  GET_ALL = '[Products] Get_ALL',
  Get_ALL_SUCCESS = '[Products] Get_ALL_SUCCESS',
  SERVER_ERROR = '[Products] SERVER_ERROR',
  ADD_TO_CART = '[Products] ADD_TO_CART',
  ADD_TO_CART_SUCCESS = '[Products] ADD_TO_CART_SUCCESS',
  REMOVE_FROM_CART = '[Products] REMOVE_FROM_CART',
  REMOVE_FROM_CART_SUCCESS = '[Products] REMOVE_FROM_CART_SUCCESS'
};

export class GetAll implements Action{
  readonly type: string = ProductsActionTypes.GET_ALL;
  constructor(public payload:object){}
}

export class GetAllSuccess implements Action{
  readonly type: string = ProductsActionTypes.Get_ALL_SUCCESS;
  constructor(public payload:Product[]){}
};

export class AddToCart implements Action{
  readonly type: string = ProductsActionTypes.ADD_TO_CART;
  constructor(public payload:number){}
};

export class AddToCartSuccess implements Action{
  readonly type: string = ProductsActionTypes.ADD_TO_CART_SUCCESS;
  constructor(public payload:number){}
};

export class RemoveFromCart implements Action{
  readonly type: string = ProductsActionTypes.REMOVE_FROM_CART;
  constructor(public payload:number){}
};

export class RemoveFromCartSuccess implements Action{
  readonly type: string = ProductsActionTypes.REMOVE_FROM_CART_SUCCESS;
  constructor(public payload:number){}
};

export class ServerError implements Action{
  readonly type: string = ProductsActionTypes.SERVER_ERROR;
  constructor(public payload:string){}
};

export type ProductsActionsUnion = GetAll | GetAllSuccess | AddToCart | AddToCartSuccess | RemoveFromCart | RemoveFromCartSuccess | ServerError;
