import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from '../model/cart';
import { Order } from '../model/order';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  formValidMeassage : string | undefined

  userDetails!:FormGroup
  totalPrice : number | undefined
  cartData : any
  Message:string|undefined
  constructor(private fb:FormBuilder , private service:ProductService , private router:Router) { }

  ngOnInit(): void {
    this.userDetails=this.fb.group({
      Email:[null,Validators.required],
      Mobile:[null,Validators.required],
      FullAddress:[null,Validators.required]
    })

    this.service.currentCart().subscribe((res)=>{
      let price = 0
      this.cartData = res
      res['forEach']((item:Cart) => {
       price = price+(+item.Price * item.Quantity!)
      });
      this.totalPrice = price -(price/10)+(price/100)+200
 })
}

orderNow(data:{email:string , address:string , contact:string})
{
  if(this.userDetails.valid){
    let user = localStorage.getItem('user')
  let userId = user && JSON.parse(user).id
  if(this.totalPrice){
    let orderData:Order ={
      ...data,
      totalPrice:this.totalPrice,
      userId,
      id:undefined,
    }
    this.cartData['forEach']((items:Cart)=>{
        setTimeout(() => {
          this.service.deleteCartItems(items.id!)
        }, 500);
    })
    this.service.orderNow(orderData).subscribe((res)=>{
      if(res){
        this.Message="Your Order Has Been Placed"
        setTimeout(() => {
          this.router.navigate(['/myOrders'])
          this.Message=undefined
        }, 3000);
      }
    })
  }
  }else{
    Object.values(this.userDetails.controls).forEach(control => {
      control.markAsTouched();
      control.markAsDirty();
    });
    this.formValidMeassage="**Please Enter Required Fields"
    setTimeout(()=>{this.formValidMeassage=undefined},3000)
  }
}


  }



