import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {PaymentIdRepresentation} from '@avaloq/web-banking-common';

@Component({
  selector: 'app-page-three',
  templateUrl: './payment-detail.component.html',
})
export class PaymentDetailComponent {
  paymentIdRepresentation: PaymentIdRepresentation;

  constructor(router: Router) {
    // get payment id object from history state
    const state = router.getCurrentNavigation().extras.state || {};

    this.paymentIdRepresentation = state.paymentIdRepresentation;
  }
}
