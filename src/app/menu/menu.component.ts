import { Component, NgZone, OnInit } from '@angular/core';
import { MenuService } from '../service/menu.service';
import { PaymentService } from '../service/payment.service';
import { OrderService } from '../service/order.service';
import { OrderCreationDto } from 'src/models/orderCreation.dto';
import { PaymentLog } from 'src/models/paymentLog.model';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: any;
  orders = [];
  constructor(private menuService: MenuService, private zone:NgZone, private paymentService: PaymentService, private orderService: OrderService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if(!this.userService.isUserAuthenticated()) {
      this.router.navigate(['login']);
      return;  
    }
    this.menuService.getAllMenus().toPromise().then(res => this.items = res);
  }

  addItem(item) {
    let itemsOnOrder = this.orders.filter(i => i.item.id == item.id);

    if (itemsOnOrder.length == 0) {
      this.orders.push({ "item": { "id": item.id }, "quantity": 1, totalPrice: item.itemOptions.price })
    } else {

      let price = this.items.filter(i => i.id === item.id)[0]['itemOptions']['price'];

      if (itemsOnOrder) {
        itemsOnOrder[0]['quantity'] = itemsOnOrder[0]['quantity'] + 1;
        itemsOnOrder[0]['totalPrice'] = itemsOnOrder[0]['quantity'] * price;
      } else {
        this.orders.push(item)
      }
    }
  }

  removeItem(item) {
    let itemsOnOrder = this.orders.filter(i => i.item.id == item.id);
    if (itemsOnOrder.length == 0) return;

    let price = this.items.filter(i => i.id === item.id)[0]['itemOptions']['price'];
    let updatedQuantity = itemsOnOrder[0]['quantity'] - 1;
    if (updatedQuantity <= 0) {
      this.orders = this.orders.filter(i => i.item.id != item.id)
    }

    itemsOnOrder[0]['quantity'] = updatedQuantity;
    itemsOnOrder[0]['totalPrice'] = itemsOnOrder[0]['quantity'] * price;
  }

  getQuantity(item) {
    if(this.orders.filter(i => i.item.id == item.id).length) {
      return this.orders.filter(i => i.item.id == item.id)[0]['quantity'];
    }
    return 0;
  }

  getTotal() {
    if(this.orders.length == 0) return 0;
    return this.orders.map(item => item.totalPrice).reduce((curr, prev) => { return curr + prev; })
  }

  makePayment() {
    let order: OrderCreationDto =  {
      user: {
        id: 1
      },
      items: this.orders
    };

    this.orderService.createOrder(order).toPromise().then(res => {
      let payment: PaymentLog = {
        orderLog: {
          id: res['id']
        },
        total: this.getTotal(),
        status: "PAID"
      };

      this.paymentService.makePayment(payment).toPromise().then(res => {
        this.zone.run(() => this.router.navigate(['/order/'+payment.orderLog.id]));
      }).catch(err=> {
        this.zone.run(() => this.router.navigate(['/order/'+payment.orderLog.id]));
      })
    })
  }

  orderEmpty() {
    return this.getTotal() <= 0;
  }
}
