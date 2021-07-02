import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@gyanshop/orders';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: [
  ]
})
export class ProductPageComponent implements OnInit,OnDestroy {
  product! : Product
  endSubs$:Subject<any>=new Subject();
  quantity=1;
  constructor(private cartService:CartService,private producService:ProductsService,private route:ActivatedRoute) { }
  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.subscribe();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this._getProduct(params.productid);
    });
    
  }

  private _getProduct(id:string){
    this.producService.getProduct(id).pipe(takeUntil(this.endSubs$)).subscribe(resProd => {
      this.product = resProd;
    })
  }

  addProductCart(){
    const cartItem:CartItem= {
      productId:this.product.id,
      quantity:this.quantity
    }
    this.cartService.setCartItem(cartItem);
  }

}
