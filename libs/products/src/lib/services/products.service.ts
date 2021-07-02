import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment }  from '@env/environment';
import { Product } from '../models/product.model';

import { map } from 'rxjs/operators'; 
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiURLProducts = environment.apiURL + 'products';

  constructor(private http: HttpClient) {}

  getProducts(categoriesFilter?:string[]): Observable<Product[]> {
    let params = new HttpParams();
    if(categoriesFilter){
      params = params.append('categories',categoriesFilter.join(','));
    }
    
    return this.http.get<Product[]>(this.apiURLProducts,{params:params});
  }

  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiURLProducts, productData);
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiURLProducts}/${productId}`);
  }

  updateProduct(productData: FormData, productid: string): Observable<Product> {
    return this.http.put<Product>(`${this.apiURLProducts}/${productid}`, productData);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLProducts}/${productId}`);
  }
 

getProductsCount(): Observable<number> {
    return this.http
      .get<number>(`${this.apiURLProducts}/get/count`)
      .pipe(map((objectValue: any) => objectValue.productCount));
  }

  getFeaturedProduct(count:number):Observable<Product[]>{
    return  this.http.get<Product[]>(`${this.apiURLProducts}/get/featured/${count}`);
  }
}
