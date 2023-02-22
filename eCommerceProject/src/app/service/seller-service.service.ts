import { HttpClient } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SellerLogin } from '../model/seller-login';
import { SignUp } from '../model/sign-up';

@Injectable({
  providedIn: 'root'
})
export class SellerServiceService {


  url:string="http://localhost:3000/seller"

  isSellerLoggedIn = new BehaviorSubject<boolean>(false)

  isLogginError = new EventEmitter<boolean>(false)

  constructor(private http:HttpClient , private router:Router) { }


                                                    // sign up



  postSeller(sellerData:SignUp){
      this.http.post(this.url,sellerData , {observe:'response'})    // {observe:'response'} get data in actual format
     .subscribe((result) =>{
      this.isSellerLoggedIn.next(true)       // returning true is user logged In
      localStorage.setItem('seller' , JSON.stringify(result.body))  // storing in local storage so that user can be active even after refreshing the page.
      this.router.navigate(['/sellerHome'])
     }) ;
    }

    reloadSeller(){                           // checking if seller is Logged In by cheking local storage.
      if(localStorage.getItem('seller'))
      {
        this.isSellerLoggedIn.next(true)
        this.router.navigate(['/sellerHome'])
      }
    }



                                                       // login


  userLogIn(data:SellerLogin){
    
    this.http.get(`http://localhost:3000/seller?Email=${data.Email}&Password=${data.Password}`,
    {observe:'response'}).subscribe(
      (result:any)=>{
        if(result && result.body && result.body.length)
        {
          localStorage.setItem('seller' , JSON.stringify(result.body))    
          this.router.navigate(['/sellerHome'])
        }
        else{
           this.isLogginError.emit(true)
        }
      }
    )
  }                                                     

}