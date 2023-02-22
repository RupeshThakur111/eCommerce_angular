import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/model/cart';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';
import { SellerServiceService } from 'src/app/service/seller-service.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {

  showLogin:boolean=true;
  SignUpForm!:FormGroup;
  sellerLoginForm!:FormGroup
  authError:string=''
  UserId:number=0
  formValidMeassage : string | undefined


  constructor(private fb:FormBuilder ,
     private service:UserService ,
     private router:Router,
     private productService:ProductService
     ) 
     { }

  ngOnInit(): void {
    
 
    
    this.service.userAuthReload()
    this.SignUpForm = this.fb.group({
      Name:['',Validators.required],
      Email:['' , Validators.required],
      Password:['' , Validators.required]
    })

    this.sellerLoginForm = this.fb.group({
      Email:[null,Validators.required],
      Password:[null,Validators.required]
    })
  }

  signUp(){

    if(this.SignUpForm.valid){
      this.service.userSignUp(this.SignUpForm.value)      
    }else{
      Object.values(this.SignUpForm.controls).forEach(control => {
        control.markAsTouched();
        control.markAsDirty();
      });
      this.formValidMeassage="**Please Enter Required Fields"
      setTimeout(()=>{this.formValidMeassage=undefined},3000)
    }
  }
  logIn(){
    if(this.sellerLoginForm.valid){
      this.service.userLogin(this.sellerLoginForm.value)
    this.service.invalidUserAuth.subscribe((result)=>{
      if(result){
        this.authError="invalid Credentials"
        setTimeout(()=>(this.authError=""),5000)
      }else{

        setTimeout(() => {
          this.localCartToRemoteCart()

        }, 2000);
      }
    })
    }else{
      Object.values(this.sellerLoginForm.controls).forEach(control => {
        control.markAsTouched();
        control.markAsDirty();
      });
      this.formValidMeassage="**Please Enter Required Fields"
      setTimeout(()=>{this.formValidMeassage=undefined},3000)
    }
  }

  openSignUp(){
     this.showLogin = false
  }

  openLogin(){
    this.showLogin = true
  }

  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart')
    if(data){
      let cartDataList:Product[] = JSON.parse(data)
      let user = localStorage.getItem('user')
      let userId = user && JSON.parse(user).id
      this.UserId=userId

      cartDataList.forEach((product:Product , index) => {    
        
        let cartData : Cart = {
          ...product,
          ProductId : product.id,
          userId
        }
        delete cartData.id;
        console.log(cartData);
        console.log(userId);
        
        
     setTimeout(() => {
      this.productService.addToCartApi(cartData).subscribe((result)=>{
        if(result){
          //console.log("item stored in db"+JSON.stringify(result));
        }
      })
      if(cartDataList.length === index+1){
        localStorage.removeItem('localCart')
      }
     }, 500);
      });
    }

    setTimeout(() => {
       this.productService.getCartList(this.UserId)
    }, 2000);
  }
}
