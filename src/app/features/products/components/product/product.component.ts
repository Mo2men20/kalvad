import { Component, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent{

  @Input() product: Product;
  @Input() isForCart: boolean;
  constructor(public productsService: ProductsService) { }

  private quantityChanged(product: Product, event: MatSelectChange): void{
    this.productsService.changeQuantity(product, event.value);
  }

}
