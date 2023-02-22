import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../model/cart';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productQuantity:number=1
  productId:any
  productData:any
  removeCart=false;
  cartData:Product | undefined
  constructor(private route:ActivatedRoute , private service:ProductService) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId')
    
    this.service.getById(this.productId).subscribe((data)=>{
         this.productData = data;   
         console.log(this.productData.Image);
         
         let cartData = localStorage.getItem('localCart');
         if(this.productId && cartData){
          let items = JSON.parse(cartData)
          items = items.filter((item:Product)=>this.productId == item.id.toString())
          if(items.length){
            this.removeCart = true
          }else{
            this.removeCart=false
          }
         }
         let user = localStorage.getItem('user')
         if(user){
          let userId = user && JSON.parse(user).id
          this.service.getCartList(userId)
          this.service.cartData.subscribe((res)=>{
             let item = res.filter((item:Product)=>this.productId?.toString() == item.productId?.toString())
             if(item.length){
              this.cartData = item[0]
              this.removeCart=true
             }
          })
         }
    })
  }

  handleQuantity(val:string){
    if(this.productQuantity<20 && val === "plus"){
      this.productQuantity+=1
    }
    else if(this.productQuantity>1 && val === "min"){
      this.productQuantity-=1
    }
  }

  AddToCart(){
    if(this.productData){
      this.productData.Quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
           this.service.localAddToCart(this.productData)
           this.removeCart = true
      }else{
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id
        let cartData:Cart = 
        {
          ...this.productData ,
           userId , 
           productId:this.productData.id  
        }
        console.log(cartData);
        
        delete cartData.id;
        this.service.addToCartApi(cartData).subscribe((result)=>{
          if(result){
            this.service.getCartList(userId)
            this.removeCart=true
          }
        })
      }
    }
  }

  RemoveToCart(productId:any){
    let user = localStorage.getItem('user')
    let userId = user && JSON.parse(user).id

   if(!localStorage.getItem('user')){
    this.service.removeIteFromCart(productId)

   }
   else{
    this.cartData && this.service.removeToCart(this.cartData.id).subscribe((res)=>{
      this.service.getCartList(userId)
    })
    this.removeCart=false
   }
  }
}
