import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent implements OnInit {

  constructor(private fb:FormBuilder , private route:ActivatedRoute , private productService:ProductService , private router:Router) { }

  messageAfterUpdated:string|undefined
  idFromUrl:number=0;
  dataById:any
  AddProductForm!:FormGroup
  ngOnInit(): void {
 
   
    this.AddProductForm = this.fb.group({
      Name:[null,Validators.required],
      Price:[null,Validators.required],
      Color:[null,Validators.required],
      Category:[null,Validators.required],
      Desciption:[null,Validators.required],
      Image:[null,Validators.required],
    }) 

    this.route.params.subscribe(params => {
      this.idFromUrl = params['id'];

      this.productService.getById(this.idFromUrl).subscribe((res:any)=>{
        this.dataById = res
        this.AddProductForm.patchValue({
          Name:res.Name,
          Price:res.Price,
          Color:res.Color,
          Category:res.Category,
          Desciption:res.Desciption,
        })
      })
    });
  }

  UpdateProduct(data:Product){
    data.id = this.dataById.id
    this.productService.updateProduct(this.AddProductForm.value).subscribe((res)=>{
      if(res){
        this.messageAfterUpdated = "Product Updated"
      }
      setTimeout(()=>(this.messageAfterUpdated = undefined) , 3000)
      this.router.navigate(['/sellerHome'])
    })
  }
}
