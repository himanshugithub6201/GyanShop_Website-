import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@gyanshop/ui';
import { OrdersModule } from '@gyanshop/orders';
import { ProductsModule } from '@gyanshop/products';
import { AccordionModule } from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessagesComponent } from './shared/messages/messages.component';
const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    }
];
@NgModule({
    declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent, MessagesComponent],
    imports: [ToastModule,OrdersModule,BrowserModule, BrowserAnimationsModule, AccordionModule, RouterModule.forRoot(routes), UiModule,ProductsModule,HttpClientModule],
    providers: [MessageService],
    bootstrap: [AppComponent]
})
export class AppModule {}
