import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit,OnDestroy {
  isCategoryPage=false;
  products:Product[]=[];
  checked = false;
  categories:Category[]=[];
  endSubs$:Subject<any>=new Subject();
  cendSubs$:Subject<any>=new Subject();
  constructor(private route:ActivatedRoute,private productsService:ProductsService,private categoryService:CategoriesService) { }
  ngOnDestroy(): void {
    this.endSubs$.next();
    this.endSubs$.complete();
    this.cendSubs$.next();
    this.cendSubs$.complete();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      params.categoryid? this._getProducts([params.categoryid]):this._getProducts();
      params.categoryid? (this.isCategoryPage=true):(this.isCategoryPage=false)
    })
    this._getCategories();
  }

  private _getProducts(categoriesFilter?:any[]){
    this.productsService.getProducts(categoriesFilter).pipe(takeUntil(this.endSubs$)).subscribe(products =>{
      this.products = products;
    })
  }

  private _getCategories(){
    this.categoryService.getCategories().pipe(takeUntil(this.cendSubs$)).subscribe(categories=>{
      this.categories = categories;
    })
  }

  categoryFilter(){
    const  selectedCategories = this.categories.filter(category => category.checked).map(category => category.id)
    this._getProducts(selectedCategories);
    
  }

}
