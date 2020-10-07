import { Injectable } from '@angular/core';
import { from, Observable, of, Subject } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general.service';
import { Product } from '../models/product.model';

const products:Product[] = [
  {
    id:1,
    name:"Potatoes",
    price:5,
    inCart:false,
    imgSrc:'assets/svg/potatoe.svg'
  },
  {
    id:2,
    name:"Carrots",
    price:4,
    inCart:false,
    imgSrc:'assets/svg/carrots.svg'
  },
  {
    id:3,
    name:"Onions",
    price:2,
    inCart:false,
    imgSrc:'assets/svg/onion.svg'
  }
];

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private generalService:GeneralService) { }

  productsCopy:Product[] = Object.assign([],products);

  productsSubject = new Subject<Product[]>();
  products$ = this.productsSubject.asObservable().pipe(startWith(this.productsCopy));

  cartSubject = new Subject<Product[]>();
  cartProducts$ = this.products$.pipe(
    map(products=>products.filter(p => p.inCart))
  );

  addToCart(product:Product){
    this.productsCopy.filter(p => p.id === product.id)[0].quantity = 1;
    this.productsCopy.filter(p => p.id === product.id)[0].inCart = true;

    this.productsSubject.next(this.productsCopy);
    this.cartSubject.next(this.productsCopy);

    this.generalService.showSuccess();
  }

  removeFromCart(product:Product){
    this.productsCopy.filter(p => p.id === product.id)[0].inCart = false;
    this.productsSubject.next(this.productsCopy);
    this.cartSubject.next(this.productsCopy);

    this.generalService.showSuccess();
  }

  changeQuantity(product:Product,quanitity:number){
    this.productsCopy.filter(p => p.id === product.id)[0].quantity = quanitity;

    this.productsSubject.next(this.productsCopy);
    this.cartSubject.next(this.productsCopy);
  }

  clearCart(){
    this.productsCopy = Object.assign([],products);
    this.productsSubject.next(this.productsCopy);
    this.cartSubject.next(this.productsCopy);
  }
}
