import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchedItemComponent } from './searched-item/searched-item.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerLoginComponent } from './seller-login/seller-login.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SellerComponent } from './seller/seller.component';
import { UserAuthComponent } from './users/user-auth/user-auth.component';

const routes: Routes = [
  {path:'' , component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'seller' , component:SellerComponent},
  {path:'sellerHome' , component:SellerHomeComponent , canActivate:[AuthGuard]},
  {path:'sellerLogin' , component:SellerLoginComponent},
  {path:'sellerAddProduct' , component:SellerAddProductComponent , canActivate:[AuthGuard]},
  {path:'sellerUpdateProduct/:id' , component:SellerUpdateProductComponent , canActivate:[AuthGuard]},
  {path:'search/:query' , component:SearchedItemComponent},
  {path:'details/:productId' , component:ProductDetailsComponent},
  {path:'userAuth' , component:UserAuthComponent},
  {path:'cartPage' , component:CartPageComponent},
  {path:'checkOut' , component:CheckOutComponent},
  {path:'myOrders' , component:MyOrdersComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
