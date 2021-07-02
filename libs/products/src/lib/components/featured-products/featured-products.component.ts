import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styles: [
  ]
})
export class FeaturedProductsComponent implements OnInit,OnDestroy {
  endSubs$:Subject<any>=new Subject
  featuredProducts:Product[]=[]
  constructor(private prodService:ProductsService) { }
  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  ngOnInit(): void {
    this._getFeaturedProducts()
  }

  private _getFeaturedProducts(){
    this.prodService.getFeaturedProduct(4).pipe(takeUntil(this.endSubs$)).subscribe(products=>{
      this.featuredProducts = products;
    })
  }

}
