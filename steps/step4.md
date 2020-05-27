# 4. Configuration of Banklets

## Goal

* Understand Banklet configuration
* Identify UI-SDK components in Banklet

## Tasks

In this step, we finally link all the three views:

![Application flow](./fullAppFlow.png "Application flow")

### 4.1 Create component with Payment list

In the command line, generate the new component that will wrap the Payment list Banklet:

```bash
npx ng generate component payments/payment-overview --module payments --skipTests true
```

Include the Banklet by modifying `src\app\payments\payment-overview\payment-overview.component.html` to:

```html
<h2>{{'avq-web-banking-workshop.payment-overview.title' | translate}}</h2>

<avq-web-banking-payment-overviews-banklet
  [view]="bankletViews.enteredPayments"
  (showPaymentDetails)="onShowPaymentDetails($event)"
>
</avq-web-banking-payment-overviews-banklet>
```

Notice we just added an *h2* heading element for this view, which is translated using the `translate` pipe.

Modify `src\app\payments\payment-overview\payment-overview.component.ts` and add these lines:

```javascript
export class PaymentOverviewComponent {

  public bankletViews = PaymentOverviewsBankletViews;

  constructor(private router: Router) {}

  onShowPaymentDetails(paymentIdRepresentation: PaymentIdRepresentation) {
    this.router.navigate(['payments/detail'], {
      state: {
        paymentIdRepresentation
      }
    });
  }
}
```

Notice the `PaymentOverviewsBanklet` also emits an event that we need to route to the Payment details. 

Do not forget the required imports in the same file:

```javascript
import {Router} from '@angular/router';

import {PaymentOverviewsBankletViews} from '@avaloq/web-banking-payment-overviews-banklet';
import {PaymentIdRepresentation} from '@avaloq/web-banking-common';
```

### 4.2 Link payment list view to the routing

Include the Payment Overviews Banklet module. 
Add also the route to this new view by including the new navigation inside the `src\app\payments\payment.module.ts` module:

```javascript
import {PaymentOverviewsBankletModule} from '@avaloq/web-banking-payment-overviews-banklet';

@NgModule({
  declarations: [PaymentOverviewComponent, PaymentDetailComponent],
  imports: [
    AvqI18nModule,
    RouterModule.forChild([
      {path: '', component: PaymentOverviewComponent},
      {path: 'detail', component: PaymentDetailComponent},
    ]),
    PaymentOverviewsBankletModule,
    PaymentDetailsBankletModule,
  ],
})
```

Add the route to the the dashboard payment `src\app\dashboard\dashboard.component.ts` file:

```javascript
  constructor(private router: Router) {}

  onShowAllPayments($event: PaymentState[]) {
    this.router.navigate(['payments']);
  }
```

Modify the left menu in `src\app\app.component.html` to add these two routes and the router outlet:

```html
<nav class="mat-app-background">
    <mat-nav-list>
        <a mat-list-item routerLink="/dashboard" routerLinkActive="active">{{'avq-web-banking-workshop.menu.dashboard' | translate}}</a>
        <a mat-list-item routerLink="/payments" routerLinkActive="active">{{'avq-web-banking-workshop.menu.payments' | translate}}</a>
    </mat-nav-list>
</nav>
```

### 4.3 Fix translation and navigation

At this point the application fails: we are using the `translate` pipe in our wrapper component but we don't have a module that declares it. 
We need to add the `TranslateModule` from `@ngx-translate/core` in order to work. 

Add the `TranslateModule` in the payments module (`src\app\payments\payments.module.ts` file):

```javascript
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    // ...
    TranslateModule,
  ],
})
```

Check the whole app navigation works, including the left menu. At this point the three Banklets are correctly linked.

### 4.4 Configure the Banklet

The last step consists in modifying the configuration for the payment overview Banklet.

Add the following configuration to the `src\app\payments\payment.module.ts` module:

```javascript
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
```

And in the same file add this new service provider:

```javascript
@NgModule({
  // ...

  providers: [
    {
      provide: PAYMENT_OVERVIEWS_BANKLET_CONFIG,
      useValue: paymentOverviewsBankletConfig,
    },
  ],
})
```

We decided to add the Banklet configuration directly in the feature module, although it could easily be split in a different file and then imported here.

Check whether the payment overview Banklet correctly applied the changes.

## Definition of done

* Navigation with Payment list is fully working
* Payment list Banklet hides "Debit account" column and hide "Failed" quick filter
* UI-SDK components can be identified: show them in [UI-SDK documentation](https://docs.avaloq.com/ui-sdk/) 

Before moving to the next step, commit your changes locally (so you can check your incremental changes), or switch to the `step4` branch of this repository.

## Prev/Next steps
* [Step 3. Navigation between Banklets](./step3.md)
* [Step 5. Internationalization (i18n)](./step5.md)
