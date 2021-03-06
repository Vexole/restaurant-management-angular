import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../service/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private paymentService: PaymentService) { }
  hasPayments = false;
  payments;
  ngOnInit(): void {
    this.paymentService.getAllPayments().toPromise().then(res => {
      this.payments = res;
      this.hasPayments = this.payments.length > 0;
    })
  }

}
