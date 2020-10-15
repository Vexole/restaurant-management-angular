import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentLog } from 'src/models/paymentLog.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  makePayment(payment: PaymentLog) {
    return this.http.post("http://localhost:9091/makePayment", payment);
  }

  getAllPayments() {
    return this.http.get("http://localhost:9091/getAllPayments");
  }
}
