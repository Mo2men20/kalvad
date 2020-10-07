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
    inCart: false,
    imgSrc: 'assets/svg/potatoe.svg'
  },
  {
    id: 2,
    name: 'Carrots',
    price: 4,
    inCart: false,
    imgSrc: 'assets/svg/carrots.svg'
  },
  {
    id: 3,
    name: 'Onions',
    price: 2,
    inCart: false,
    imgSrc: 'assets/svg/onion.svg'
  }
];

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private generalService: GeneralService) { }

  private productsCopy: Product[] = source.map(p => Object.assign({}, p));

  private productsSubject = new BehaviorSubject<Product[]>(source);
  public products$ = this.productsSubject.asObservable();

  private cartSubject = new BehaviorSubject<Product[]>([]);
  public cartProducts$ = this.products$.pipe(
    map(products => products.filter(p => p.inCart))
  );

  public addToCart(product: Product): void {
    const productToUpdate: Product = this.getProductToUpdate(product);

    productToUpdate.quantity = 1;
    productToUpdate.inCart = true;

    this.refreshStreams();
    this.generalService.showSuccess();
  }

  public removeFromCart(product: Product): void {
    const productToUpdate: Product = this.getProductToUpdate(product);

    productToUpdate.inCart = false;

    this.refreshStreams();
    this.generalService.showSuccess();
  }

  public changeQuantity(product: Product, quanitity: number): void {
    const productToUpdate: Product = this.getProductToUpdate(product);

    productToUpdate.quantity = quanitity;

    this.refreshStreams();
  }

  public clearCart(): void {
    this.productsCopy = source.map(p => Object.assign({}, p));

    this.refreshStreams();
  }

  private refreshStreams(): void {
    this.productsSubject.next(this.productsCopy);
    this.cartSubject.next(this.productsCopy);
  }

  private getProductToUpdate(product: Product): Product {
    return this.productsCopy.find(p => p.id === product.id);
  }
}
