import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { SellerServiceService } from '../service/seller-service.service';


@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {

  SignUpForm!:FormGroup;
  formValidMeassage : string | undefined
  constructor(private fb:FormBuilder ,
     private service:SellerServiceService ,
     private router:Router
     ) 
     { }

  ngOnInit(): void {
    this.service.reloadSeller()
    this.SignUpForm = this.fb.group({
      Name:['',Validators.required],
      Email:['' , Validators.required],
      Password:['' , Validators.required]
    })
  }

  signUp(){
    if(this.SignUpForm.valid){
      this.service.postSeller(this.SignUpForm.value)   
    }
    else{
      Object.values(this.SignUpForm.controls).forEach(control => {
        control.markAsTouched();
        control.markAsDirty();
      });
      this.formValidMeassage="**Please Enter Required Fields"
      setTimeout(()=>{this.formValidMeassage=undefined},3000)
    }
  }
  
}
