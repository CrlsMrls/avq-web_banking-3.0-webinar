import {NgModule} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {TranslateModule} from '@ngx-translate/core';

import {WebBankingCommonModule} from '@avaloq/web-banking-common';
import {AfpRestModule} from '@avaloq/web-banking-common-afp-rest';
import {AvqI18nModule, AvqI18nService} from '@avaloq/i18n';
import {AvqMaterialIntlModule} from '@avaloq/ui-elements';

import {environment} from '../environments/environment';

// i18n
import angularLocaleEnGB from '@angular/common/locales/en-GB';
export function avqI18nInitializer(i18nService: AvqI18nService, httpClient: HttpClient) {
  const initAsync = async () => {
    const translations: any = await httpClient.get(`/assets/i18n/en-GB.json`).toPromise();
    return i18nService.initialize('en-GB', angularLocaleEnGB, translations);
  };

  return initAsync;
}

@NgModule({
  imports: [
    // ngrx
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : undefined,

    // i18n
    AvqI18nModule.forRoot({
      loader: {
        useFactory: avqI18nInitializer,
        deps: [AvqI18nService, HttpClient],
      },
    }),
    AvqMaterialIntlModule,

    // common REST functionality for AFP server (e.g. adding afp-lang based on the selected locale)
    AfpRestModule,
    WebBankingCommonModule
  ],
  exports: [TranslateModule],
})
export class AvaloqModule {}