import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderCreationDto } from 'src/models/orderCreation.dto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(orderCreationDto: OrderCreationDto) {
    return this.http.post("http://localhost:9091/order/createOrder", orderCreationDto);
  }

  getAllOrders() {
    return this.http.get("http://localhost:9091/order/getOrders");
  }

  getOrderById(id) {
    return this.http.get("http://localhost:9091/order/getOrderById?id="+id);
  }
}
