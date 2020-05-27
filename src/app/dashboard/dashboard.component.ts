import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {PaymentInList, PaymentState} from '@avaloq/web-banking-common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  paymentListStateRecentlyUsed = [PaymentState.APPROVED, PaymentState.PROCESSED];
  paymentListStateUpcoming = [PaymentState.IN_WORK];

  constructor(private router: Router) {}

  onShowPayment(payment: PaymentInList) {
    this.router.navigate(['payments/detail'], {
      state: {
        paymentIdRepresentation: payment.id
      }
    });
  }

  onShowAllPayments($event: PaymentState[]) {
    this.router.navigate(['payments']);
  }

}
