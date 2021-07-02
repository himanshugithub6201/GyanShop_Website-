import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { LocalStorageService } from './localtorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURLAuth = environment.apiURL + 'users';

  constructor(private localStorageService:LocalStorageService,private http : HttpClient,private router:Router) { }

  login(email:string,password:string):Observable<User>{
    return this.http.post<User>(`${this.apiURLAuth}/login`,{email:email,password:password})
  }
  logout(){
    this.localStorageService.removeToken();
    this.router.navigate(['/login']);
  }
}
