import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent implements OnInit {

  formValidMeassage : string | undefined

  AddProductForm!:FormGroup;
  messageAfterAdded:string|undefined
  messageAfterUpdated:string | undefined
  idFromUrl:number=0;
  dataById:any;
  updateData:any;
  base64textString: string = '';
  imagePath!: SafeResourceUrl;
  constructor(private fb:FormBuilder , private productService:ProductService , private route:ActivatedRoute , private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.AddProductForm = this.fb.group({
      Name:[null,Validators.required],
      Price:[null,Validators.required],
      Color:[null,Validators.required],
      Category:[null,Validators.required],
      Desciption:[null,Validators.required],
      Image:[null,Validators.required],
    })
  }

  AddProduct(){
    if(this.AddProductForm.valid){
      
      const fullPath = this.AddProductForm.value.Image;
      console.log(this.AddProductForm.controls["Image"].value);

      const subString = fullPath.split("\\").pop();
      this.AddProductForm.value.Image = subString     
                 
      this.productService.AddProduct(this.AddProductForm.value).subscribe((res)=>{
         if(res){
          this.messageAfterAdded="product addded sucessfully!!"
         }
         setTimeout(() => (this.messageAfterAdded = undefined) , 3000)
      })
  
      this.AddProductForm.reset()
    }
    else{
      Object.values(this.AddProductForm.controls).forEach(control => {
        control.markAsTouched();
        control.markAsDirty();
      });
      this.formValidMeassage="**Please Enter Required Fields"
      setTimeout(()=>{this.formValidMeassage=undefined},3000)
    }
  }


}
