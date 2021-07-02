import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category} from '@gyanshop/products'
import { MessageService } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit,OnDestroy {
  endsubs$ : Subject<any> = new Subject();
  categories:Category[] = [];
  constructor(private router:Router,private confirmationService: ConfirmationService,private messageService:MessageService ,private categoriesService: CategoriesService) { }
  ngOnDestroy(): void {
    this.endsubs$.next();
   this.endsubs$.complete();
  }

  ngOnInit(): void {
   this._getCategories();
  }

  deleteCategory(categoryId:string):void{
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe(()=>{
          this._getCategories();
          this.messageService.add({severity:'success', summary:'Success', detail:'Category is Deleted'});
        },
        ()=>{
          this.messageService.add({severity:'error', summary:'Error', detail:'Ctaegory not deleted'});
        })
      },
  });
    
  }

  updateCategory(categoryId:string):void{
    this.router.navigateByUrl(`categories/form/${categoryId}`);

  }

  private _getCategories(){
    this.categoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe(cats => {
      this.categories =cats;
    })
  }

  

}
