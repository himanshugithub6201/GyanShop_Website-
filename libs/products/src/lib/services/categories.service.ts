import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { environment }  from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiUrlCategories = environment.apiURL + 'categories/';
  constructor(private http: HttpClient) { }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.apiUrlCategories)
  }
  getCategory(categoryId:string):Observable<Category>{
    return this.http.get<Category>(`${this.apiUrlCategories}/${categoryId}`);
  }

  createCategory(category : Category):Observable<Category>{
    return this.http.post<Category>(this.apiUrlCategories,category);
  }

  deleteCategory(categoryId:string):Observable<any>{
    return this.http.delete<any>(`${this.apiUrlCategories}/${categoryId}`);
  }

  updateCategory(category : Category):Observable<Category>{
    return this.http.put<Category>(this.apiUrlCategories+category.id,category);
  }
}
