import { Component } from '@angular/core';
import { SellerServiceService } from './service/seller-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  year = new Date().getFullYear();

  title = 'eCommerceProject';
 
}
