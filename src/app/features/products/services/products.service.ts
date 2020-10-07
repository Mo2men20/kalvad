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
  // ,
  // {
  //   id:4,
  //   name:"Unknown#1",
  //   price:8,
  //   inCart:false,
  //   imgSrc:'assets/svg/question-mark-draw.svg'
  // },
  // {
  //   id:5,
  //   name:"Unknown#2",
  //   price:5,
  //   inCart:false,
  //   imgSrc:'assets/svg/question-mark-draw.svg'
  // },
  // {
  //   id:6,
  //   name:"Unknown#3",
  //   price:7,
  //   inCart:false,
  //   imgSrc:'assets/svg/question-mark-draw.svg'
  // },
  // {
  //   id:7,
  //   name:"Unknown#4",
  //   price:3,
  //   inCart:false,
  //   imgSrc:'assets/svg/question-mark-draw.svg'
  // }
];

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private generalService: GeneralService) { }

  productsCopy: Product[] = source.map(p => Object.assign({}, p));

  productsSubject = new BehaviorSubject<Product[]>(source);
  products$ = this.productsSubject.asObservable();

  cartSubject = new BehaviorSubject<Product[]>([]);
  cartProducts$ = this.products$.pipe(
    map(products => products.filter(p => p.inCart))
  );

  addToCart(product: Product): void {
    this.productsCopy.filter(p => p.id === product.id)[0].quantity = 1;
    this.productsCopy.filter(p => p.id === product.id)[0].inCart = true;

    this.productsSubject.next(this.productsCopy);
    this.cartSubject.next(this.productsCopy);

    this.generalService.showSuccess();
  }

  removeFromCart(product: Product): void {
    this.productsCopy.filter(p => p.id === product.id)[0].inCart = false;
    this.productsSubject.next(this.productsCopy);
    this.cartSubject.next(this.productsCopy);

    this.generalService.showSuccess();
  }

  changeQuantity(product: Product, quanitity: number): void {
    this.productsCopy.filter(p => p.id === product.id)[0].quantity = quanitity;

    this.productsSubject.next(this.productsCopy);
    this.cartSubject.next(this.productsCopy);
  }

  clearCart(): void {
    this.productsCopy = source.map(p => Object.assign({}, p));

    this.productsSubject.next(this.productsCopy);
    this.cartSubject.next(this.productsCopy);
  }
}
