import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import {CheckboxModule} from 'primeng/checkbox';
import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import {RatingModule} from 'primeng/rating';
import {UiModule} from '@gyanshop/ui'
import {InputNumberModule} from 'primeng/inputnumber';
export const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'category/:categoryid',
    component:ProductsListComponent
  },
  {
    path: 'products/:productid',
    component:ProductPageComponent
  }
]

@NgModule({
    imports: [UiModule,InputNumberModule,FormsModule,RatingModule,CheckboxModule,CommonModule,RouterModule,ButtonModule,RouterModule.forChild(routes)],
    declarations: [
      ProductsSearchComponent,
      CategoriesBannerComponent,
      ProductItemComponent,
      FeaturedProductsComponent,
      ProductsListComponent,
      ProductPageComponent
    ],
    exports:[ProductsSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductsComponent, ProductsListComponent, ProductPageComponent]
})
export class ProductsModule {}
