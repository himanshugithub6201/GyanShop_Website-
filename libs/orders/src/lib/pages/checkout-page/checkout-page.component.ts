import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@gyanshop/users';
import { Cart } from '../../models/cart';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';
import { ORDER_STATUS } from '../../order.constants';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/order.service';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [
  ]
})
export class CheckoutPageComponent implements OnInit {

  
  constructor(
    private router: Router,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private cartService:CartService,
    private orderService:OrdersService
  ) {}
  checkoutFormGroup!: FormGroup;
  isSubmitted = false;
  userId="60ddfd1543048e53308c3f0d";
  orderItems?: OrderItem[] = [];
  // userId!: string;
  countries:any = [];

  ngOnInit(): void {
    this._initCheckoutForm();
    this._getCartItems();
    this._getCountries();
  }

  private _getCartItems(){
    const cart:Cart = this.cartService.getCart();
    this.orderItems = cart.items?.map(item =>{
      return {
        product:item.productId,
        quantity:item.quantity
      }
    });
  }
  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      return;
    }

    const order:Order={
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm.street.value,
      shippingAddress2: this.checkoutForm.apartment.value,
      city: this.checkoutForm.city.value,
      zip: this.checkoutForm.zip.value,
      country: this.checkoutForm.country.value,
      phone: this.checkoutForm.phone.value,
      status: 0,
      user: this.userId,
      dateOrdered: `${Date.now()}`
    }

    this.orderService.createOrder(order).subscribe(()=>{
      this.cartService.emptyCart();
     this.router.navigate(['/success']);
    },()=>{
      //display some message
    })
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
