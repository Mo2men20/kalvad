import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { GeneralService } from '../services/general.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent{

  constructor(public productsService:ProductsService,
    public generalService:GeneralService) { }

  calculateTotal(products:Product[]){
    let sum:number = 0;
    products.forEach(p => sum+= p.quantity * p.price);
    return sum;
  }

  placeOrder(products:Product[]){
    console.table(products);
    this.generalService.showSuccess('You order is placed.');
  }
}
