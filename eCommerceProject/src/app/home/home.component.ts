import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularProducts:undefined | Product[]
  allProduct:undefined | Product[]


  constructor(private producrService:ProductService) { }

  ngOnInit(): void {
    
 

    this.producrService.popularProduct().subscribe((data)=>{
      this.popularProducts = data;
    })


    this.producrService.getProduct().subscribe((data)=>{
      this.allProduct = data
    })
  }

}
