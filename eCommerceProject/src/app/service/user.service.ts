import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { observable } from 'rxjs';
import { SellerLogin } from '../model/seller-login';
import { SignUp } from '../model/sign-up';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string="http://localhost:3000/Users"
  invalidUserAuth = new EventEmitter<boolean>(false)
  constructor(private http:HttpClient , private router:Router) { }

  userSignUp(user:SignUp){
   return this.http.post(this.url,user , {observe:'response'})
   .subscribe((result)=>{
    if(result){
      localStorage.setItem('user',JSON.stringify(result.body))
      this.router.navigate(['/'])
    }
   })
  }

  userLogin(data:SellerLogin){
    return this.http.get<SignUp[]>(`http://localhost:3000/Users?Email=${data.Email}&&Password=${data.Password}`,
    {observe:'response'}).subscribe((result)=>{
      if(result && result.body?.length){
        this.invalidUserAuth.emit(false)
        localStorage.setItem('user',JSON.stringify(result.body[0]))
      this.router.navigate(['/'])
      }else{
            this.invalidUserAuth.emit(true)
      }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }
}
