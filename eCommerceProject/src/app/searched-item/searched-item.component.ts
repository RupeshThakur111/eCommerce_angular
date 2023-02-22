import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-searched-item',
  templateUrl: './searched-item.component.html',
  styleUrls: ['./searched-item.component.scss']
})
export class SearchedItemComponent implements OnInit {


  searchedResult:undefined|Product[]
  constructor(private route:ActivatedRoute , private productService:ProductService) { }

  ngOnInit(): void {
    let query = this.route.snapshot.paramMap.get('query')
    
    this.productService.searchProduct(query!).subscribe((data)=>{
      this.searchedResult = data
    })
  }

}
