import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../model/cart';
import { PriceSummary } from '../model/price-summary';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cartData: any
  priceSummary: PriceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  constructor(private service: ProductService , private router:Router) { }

  ngOnInit(): void {
   this.loadDetails()
  }

  loadDetails(){
    this.service.currentCart().subscribe((res) => {
      this.cartData = res
      let price = 0
      res['forEach']((item: Cart) => {
        price = price + (+item.Price * item.Quantity!)
      });
      this.priceSummary.price = price
      this.priceSummary.discount = price / 10
      this.priceSummary.tax = price / 100
      this.priceSummary.delivery = 200
      this.priceSummary.total = this.priceSummary.price + this.priceSummary.tax + this.priceSummary.delivery - this.priceSummary.discount

      if(!this.cartData.length){
        this.router.navigate(['/'])
      }
    })
  }

  removeToCart(cartId:number | undefined){
    this.cartData && this.service.removeToCart(cartId!).subscribe((res)=>{
      setTimeout(() => {
        this.loadDetails()
      }, 500);
  })
}

}
