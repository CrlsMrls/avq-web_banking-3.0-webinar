import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';

import {AvaloqModule} from './avaloq.module';
import {MaterialModule} from './material.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,

    // Avaloq base capabilities
    AvaloqModule,

    // banklet modules
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}