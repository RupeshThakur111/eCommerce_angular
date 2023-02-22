import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  ValFromSearch:any;
  headerType:string="default"
  sellerName:string=""
  userName:string=""
  cartItemsNumber=0
  searchResult:undefined|Product[]
  constructor(private router:Router , private productService:ProductService , private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.events.subscribe((data:any)=>{
       if(data.url){
        if(localStorage.getItem('seller') && data.url.includes('seller')){
            let sellerStore = localStorage.getItem('seller')
            let sellerData = sellerStore && JSON.parse(sellerStore)[0]
            this.sellerName = sellerData.Name
            this.headerType='seller'

        }
        else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user')
          let userData = userStore && JSON.parse(userStore)
          this.userName = userData.Name
          this.headerType = 'user'
          this.productService.getCartList(userData.id)
        }
        else{
         // console.log('outside seller');
          this.headerType='default' 
        }
       }
    })

    let cartData = localStorage.getItem('localCart')
    if(cartData){
      this.cartItemsNumber = JSON.parse(cartData).length
    }
    this.productService.cartData.subscribe((items)=>{
      this.cartItemsNumber=items.length
    })
  }

  sellerLogout(){
    localStorage.removeItem('seller')
    this.router.navigate(['/'])
  }
  userLogout(){
    localStorage.removeItem('user')
    this.router.navigate(['/userAuth'])
    this.productService.cartData.emit([]);
  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const elemets = query.target as HTMLInputElement;
      this.productService.searchProduct(elemets.value).subscribe((result)=>{
      if(result.length>5){
        result.length=5;
      }
      this.searchResult=result;
      })
    }
  }
  hideSearch(){
    this.searchResult = undefined
  }

  submitSearch(val:string){
    this.ValFromSearch=val;
   // console.log(this.ValFromSearch);
    this.router.navigate([`search/${val}`])
    //console.log('clicked');
    
  }
  redirectToDetails(id:number){
     this.router.navigate(['/details/'+id])
  }
}
