import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';

import {AvaloqModule} from './avaloq.module';
import {MaterialModule} from './material.module';
import {DashboardComponent} from './dashboard/dashboard.component';

import {DashboardPaymentListModule} from '@avaloq/web-banking-payment-highlights-list';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,

    // Avaloq base capabilities
    AvaloqModule,

    // banklet modules
    DashboardPaymentListModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
