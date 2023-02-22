import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  orderData:Order[] | undefined
  constructor(private produceService:ProductService) { }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder(){
    this.produceService.orderList().subscribe((result)=>{
      this.orderData = result       
   })
  }
  cancelOrder(orderId:number | undefined){
    if(orderId){
      this.produceService.cancelOrder(orderId).subscribe()
       setTimeout(() => {
        this.getOrder();
       }, 500);
    }
  }

}
