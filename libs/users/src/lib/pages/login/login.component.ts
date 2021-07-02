import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/localtorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = "Email or Password is wrong"
  constructor(private router :Router,private localStorageService :LocalStorageService,private formBuilder:FormBuilder,private authService:AuthService ) { }

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm(){
    this.loginFormGroup =this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }

  get loginForm(){
    return this.loginFormGroup.controls;
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.loginFormGroup.invalid)
     return;
    const loginData = {
      email: this.loginForm.email.value,
      password: this.loginForm.password.value
    }
    this.authService.login(loginData.email,loginData.password).subscribe(user=>{
      this.authError= false;
      this.localStorageService.setToken(user.token);
      this.router.navigate(['/']);
    },(error:HttpErrorResponse)=>{
      this.authError =true;
      if(error.status !==400){
        this.authMessage = "Error in the Server.Please Try again";
      }
    });
  }
}
