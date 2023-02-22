import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Cart } from '../model/cart';
import { Order } from '../model/order';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url:string="http://localhost:3000/Product"

  cartData = new EventEmitter<Product []|[] > ()

  constructor(private http:HttpClient) { }

  AddProduct(data:Product){
    return this.http.post(this.url,data);
    
  }

  getProduct(){
    return this.http.get<Product[]>(this.url)
  }

  deleteProduct(id:number){
    return this.http.delete(this.url+"/"+id)
  }

  getById(id:number){
    return this.http.get(this.url+"/"+id)
  }

  updateProduct(data:Product){
    return this.http.put<Product>(this.url+"/"+ data.id , data)
  }

  popularProduct(){
    return this.http.get<Product[]>(this.url+"/?_limit=10")
  }

  searchProduct(query:string){
    return this.http.get<Product[]>(this.url+"?q="+query)
  }

  localAddToCart(data:Product){
     let cartData = [];
     let localCart = localStorage.getItem('localCart')
     if(!localCart){
      localStorage.setItem('localCart' , JSON.stringify([data]))
      this.cartData.emit([data])
     }else{
      cartData = JSON.parse(localCart)
      cartData.push(data)
      localStorage.setItem('localCart' , JSON.stringify(cartData))
     }
     this.cartData.emit(cartData)
  }


   removeIteFromCart(productId:number){
    let cartData = localStorage.getItem('localCart')
    if(cartData){
      let items:Product[] = JSON.parse(cartData)
      items = items.filter((item) => productId != item.id)
      localStorage.setItem('localCart' , JSON.stringify(items))
      this.cartData.emit(items)
      console.log(items);
    }
   }

   addToCartApi(cartData:Cart){
    return this.http.post("http://localhost:3000/cart" , cartData)
   }

   getCartList(userId:number){
    return this.http.get<Product[]>("http://localhost:3000/cart?userId="+userId , 
    {observe:'response'}).subscribe((result)=>{
      if(result && result.body){
        this.cartData.emit(result.body);
      }
    })   
   }

   removeToCart(cartId:number){
     return this.http.delete("http://localhost:3000/cart/"+cartId);
   }

   currentCart(){
    let userStore = localStorage.getItem('user')
    let userData = userStore && JSON.parse(userStore)
    return this.http.get<Cart>("http://localhost:3000/cart?userId="+userData.id)   
   }


   orderNow(data:Order){
     return this.http.post("http://localhost:3000/orders",data)
   }

   orderList(){
    let userStore = localStorage.getItem('user')
    let userData = userStore && JSON.parse(userStore)
    return this.http.get<Order[]>("http://localhost:3000/orders?userId="+userData.id)
   }

   deleteCartItems(cartId:number){
    return this.http.delete("http://localhost:3000/cart/"+cartId , {observe:'response'}).subscribe((result)=>{
     if(result){
      this.cartData.emit([])
     }
    })
   }

   cancelOrder(orderId:number){
    return this.http.delete("http://localhost:3000/orders/"+orderId)
   }
}



