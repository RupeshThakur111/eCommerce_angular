import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerServiceService } from '../service/seller-service.service';

@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.scss']
})
export class SellerLoginComponent implements OnInit {

  sellerLoginForm!:FormGroup
  authError:string=''
  formValidMeassage : string | undefined

  constructor(private fb:FormBuilder , private service:SellerServiceService) { }

  ngOnInit(): void {
    this.sellerLoginForm = this.fb.group({
      Email:[null,Validators.required],
      Password:[null,Validators.required]
    })
  }

  logIn(){
    if(this.sellerLoginForm.valid){
       this.service.userLogIn(this.sellerLoginForm.value);
    this.service.isLogginError.subscribe((err)=>{
      if(err){
       this.authError="Email or Password is not correct"
      }
    })
    }
    else{
      Object.values(this.sellerLoginForm.controls).forEach(control => {
        control.markAsTouched();
        control.markAsDirty();
      });
      this.formValidMeassage="**Please Enter Required Fields"
      setTimeout(()=>{this.formValidMeassage=undefined},3000)
    }
   
  }
}
