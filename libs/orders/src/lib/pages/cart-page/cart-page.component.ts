import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {  cartItemDetailed } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/order.service';
@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit,OnDestroy {
  cardItemsDetailed :cartItemDetailed[]=[];
  endSubs$:Subject<any>=new Subject();
  cartCount = 0;
  constructor(private ordersService:OrdersService,private router :Router,private cartService :CartService) { }
  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }
  ngOnInit(): void {
    this._getCartDetails();
  }
  multiply(num1:number,num2:any):number{
    return num1*num2;

  }

  private _getCartDetails(){
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(respCart =>{
      this.cardItemsDetailed =[];
        this.cartCount = respCart?.items?.length ?? 0;
      respCart.items?.forEach(cartItem => {
        this.ordersService.getProduct(cartItem.productId??'').subscribe(respProduct =>{
          this.cardItemsDetailed.push({
            product:respProduct,
            quantity:cartItem.quantity
          });
        })
      })
    })
  }

  backToShop(){
    this.router.navigate(['products']);
  }
  deleteCartItem(cartItem:cartItemDetailed){
    this.cartService.deleteCartItem(cartItem.product.id)
  }

  updateCartItemQuantity(event:any,cartItem:cartItemDetailed){
    this.cartService.setCartItem({
      productId:cartItem.product.id,
      quantity:event.value
    },true)
  }
}
