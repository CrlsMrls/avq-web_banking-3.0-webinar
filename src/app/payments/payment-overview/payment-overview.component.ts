import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {PaymentOverviewsBankletViews} from '@avaloq/web-banking-payment-overviews-banklet';
import {PaymentIdRepresentation} from '@avaloq/web-banking-common';

@Component({
  selector: 'app-payment-overview',
  templateUrl: './payment-overview.component.html',
  styleUrls: ['./payment-overview.component.scss'],
})
export class PaymentOverviewComponent {
  public bankletViews = PaymentOverviewsBankletViews;

  constructor(private router: Router) {}

  onShowPaymentDetails(paymentIdRepresentation: PaymentIdRepresentation) {
    this.router.navigate(['payments/detail'], {
      state: {
        paymentIdRepresentation,
      },
    });
  }
}
