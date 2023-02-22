import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SellerComponent } from './seller/seller.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerLoginComponent } from './seller-login/seller-login.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchedItemComponent } from './searched-item/searched-item.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './users/user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SellerComponent,
    HomeComponent,
    SellerHomeComponent,
    SellerLoginComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent,
    SearchedItemComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    CartPageComponent,
    CheckOutComponent,
    MyOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
