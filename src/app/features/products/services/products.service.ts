import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs';
import {map, startWith, tap} from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';
import { Product } from '../models/product.model';

const source: Product[] = [
  {
    id: 1,
    name: 'Potatoes',
    price: 5,
    imgSrc: 'assets/svg/potatoe.svg'
  },
  {
    id: 2,
    name: 'Carrots',
    price: 4,
    imgSrc: 'assets/svg/carrots.svg'
  },
  {
    id: 3,
    name: 'Onions',
    price: 2,
    imgSrc: 'assets/svg/onion.svg'
  }
];

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private generalService: GeneralService) { }

  getAllProducts() : Observable<Product[]>{
    return of(source);
  };

  public addToCart(productId: number): Observable<number> {
    return of(productId);
  }

  public removeFromCart(productId: number): Observable<number> {
    return of(productId);
  }

  public changeQuantity(product: Product, quanitity: number): void {
    const productToUpdate: Product = this.getProductToUpdate(product);

    productToUpdate.quantity = quanitity;
  }

  public clearCart(): void {
    // this.productsCopy = source.map(p => Object.assign({}, p));
  }

  private getProductToUpdate(product: Product): Product {
    return source.find(p => p.id === product.id);
  }
}
