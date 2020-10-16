import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemOrder } from 'src/models/itemOrder.model';
import { OrderService } from '../service/order.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any;
  hasOrders;
  constructor(private orderService: OrderService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    if(!this.userService.isUserAuthenticated()) {
      this.router.navigate(['login']);
      return;  
    }
    this.orderService.getAllOrders().toPromise().then(res => {
      this.orders = res;
      this.hasOrders = this.orders.length > 0;
    })
  }

  getTotal(items) {
    return items.map(item => item.price).reduce(function (curr, prev) { return curr + prev; })
  }

}
