import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import {AvqI18nModule} from '@avaloq/i18n';

import {PaymentDetailsBankletModule} from '@avaloq/web-banking-payment-details-banklet';
import {PaymentDetailComponent} from './payment-detail/payment-detail.component';
import {PaymentOverviewComponent} from './payment-overview/payment-overview.component';

import {PaymentOverviewsBankletModule} from '@avaloq/web-banking-payment-overviews-banklet';

import {
  getDefaultConfig,
  PaymentOverviewsBankletConfig,
  PaymentOverviewTabColumn,
  PAYMENT_OVERVIEWS_BANKLET_CONFIG,
} from '@avaloq/web-banking-payment-overviews-banklet';

// override payment overview config
const paymentOverviewsBankletConfig: PaymentOverviewsBankletConfig = getDefaultConfig();
// remove Debit Account column
const paymentOverviewsTableColumns: PaymentOverviewTabColumn[] = [
  PaymentOverviewTabColumn.BENEFICIARY,
  // PaymentOverviewTabColumn.DEBIT_MONEY_ACCOUNT_BUSINESS_PARTNER,
  PaymentOverviewTabColumn.PAYMENT_REASON,
  PaymentOverviewTabColumn.EXECUTION_DATE,
  PaymentOverviewTabColumn.STATUS,
];
paymentOverviewsBankletConfig.visibleTabs.forEach((tab) => (tab.columns = paymentOverviewsTableColumns));

// hide the second tab
paymentOverviewsBankletConfig.visibleTabs.splice(2, 1);

@NgModule({
  declarations: [PaymentOverviewComponent, PaymentDetailComponent],
  providers: [
    {
      provide: PAYMENT_OVERVIEWS_BANKLET_CONFIG,
      useValue: paymentOverviewsBankletConfig,
    },
  ],
  imports: [
    AvqI18nModule,
    TranslateModule,
    RouterModule.forChild([
      {path: '', component: PaymentOverviewComponent},
      {path: 'detail', component: PaymentDetailComponent},
    ]),
    PaymentOverviewsBankletModule,
    PaymentDetailsBankletModule,
  ],
})
export class PaymentsModule {}
