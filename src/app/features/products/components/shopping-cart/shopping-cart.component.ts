import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent{

  constructor(public productsService: ProductsService,
              public generalService: GeneralService) { }

  calculateTotal(products: Product[]): number{
    let sum = 0;
    products.forEach(p => sum += p.quantity * p.price);
    return sum;
  }

  placeOrder(products: Product[]): void{
    console.table(products);
    this.generalService.showSuccess('You order is placed.');
  }
}
