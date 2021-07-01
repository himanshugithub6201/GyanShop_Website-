import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@gyanshop/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {

  form!: FormGroup;
  isSubmitted!:boolean;
  editMode = false;
  currentCategoryId!:string;

  constructor(private route:ActivatedRoute,private location:Location,private messageService:MessageService ,private formBuilder: FormBuilder,private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.form  = this.formBuilder.group({
      name:['',Validators.required],
      icon:['',Validators.required],
      color:['#fff']
    })
    this._checkEditMode();
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid){
      return;
    }
    const category:Category={
      id:this.currentCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value
    };
    if(this.editMode){
      this._updateCategory(category);
    }else{
      this._addCategory(category);
    }
  }

  onCancel(){
    this.location.back();
  }

  private _updateCategory(category:Category){
    this.categoriesService.updateCategory(category).subscribe(res=>{
      this.messageService.add({severity:'success', summary:'Success', detail:`Category ${res.name} is Updated`});
      timer(2000).toPromise().then(() => {
        this.location.back();
      })
    },
    ()=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'Ctaegory not Updated'});
    }
    );
  }

  private _addCategory(category:Category){
    this.categoriesService.createCategory(category).subscribe(res=>{
      this.messageService.add({severity:'success', summary:'Success', detail:`Category ${res.name} is Created`});
      timer(2000).toPromise().then(() => {
        this.location.back();
      })
    },
    ()=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'Ctaegory not created'});
    }
    );
  }

  private _checkEditMode(){
    this.route.params.subscribe(params => {
      if(params.id){
        this.editMode = true;
        this.currentCategoryId = params.id;
        this.categoriesService.getCategory(params.id).subscribe(category =>{
          this.categoryForm.name.setValue(category.name);
          this.categoryForm.icon.setValue(category.icon);
          this.categoryForm.color.setValue(category.color);
        })
      }
        

    })
  }

  get  categoryForm(){
    return this.form.controls;
  }

}
