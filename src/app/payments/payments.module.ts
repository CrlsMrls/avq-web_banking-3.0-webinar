import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {AvqI18nModule} from '@avaloq/i18n';

import {PaymentDetailsBankletModule} from '@avaloq/web-banking-payment-details-banklet';
import {PaymentDetailComponent} from './payment-detail/payment-detail.component';

@NgModule({
  declarations: [PaymentDetailComponent],
  imports: [
    AvqI18nModule,
    CommonModule,
    RouterModule.forChild([{path: 'detail', component: PaymentDetailComponent}]),
    PaymentDetailsBankletModule,
  ],
})
export class PaymentsModule {}
