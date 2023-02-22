import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';
import { faTrash , faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {

  productList:undefined | Product[]
  deletedMssg:string | undefined
  icon=faTrash
  icon2=faPen;
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  deleteProduct(id:number){
    this.productService.deleteProduct(id).subscribe((res)=>{
      if(res){
        this.deletedMssg = "product deleted succesfully!!"
      }
      this.getProduct();
      setTimeout(()=>(this.deletedMssg=undefined) , 3000)
    })
  }

  getProduct(){
    this.productService.getProduct().subscribe((res) => {
      this.productList = res
    })
  }

  updateProduct(id:number){
    this.productService.getById(id).subscribe((res)=>{
      console.log(res);
    })
  }
}
