# 5. Internationalization (i18n)

## Goal

* Learn how to add a new language to the application
* Learn how to modify a translations

## Tasks

### 5.1 Create the translation component

In the command line generate a new component:

```bash
npx ng generate component locale-selector --module app --skipTests true
```

Modify the template for this new component (`src\app\locale-selector\locale-selector.component.html` file):

```html
<div>
    <button mat-button (click)="onChangeLocale('en-GB')">{{ 'avq-web-banking-workshop.locale.en' | translate }}</button> | 
    <button mat-button (click)="onChangeLocale('de-CH')">{{ 'avq-web-banking-workshop.locale.de' | translate }}</button>
</div>
```

Add and export the constant outside the class (`src\app\locale-selector\locale-selector.component.ts` file):

```javascript
export const WEB_LOCALE = 'web-banking-locale';
```

Add this code inside the component:

```javascript
  onChangeLocale(locale: string) {
    window.localStorage.setItem(WEB_LOCALE, locale);
    window.location.reload();
  }
```

### 5.2 Add the component in the footer

Add the locale selector to the footer inside the `app.component.html` file:

```html
<footer>
    <app-locale-selector></app-locale-selector>
</footer>
```

### 5.3 Load German and English translation files

Instruct the application how to load the translations, modify the `avaloq.module.ts`:

```javascript
import { WEB_LOCALE } from './locale-selector/locale-selector.component';

// i18n
export function avqI18nInitializer(i18nService: AvqI18nService, httpClient: HttpClient) {
  const initAsync = async () => {
    const localeId = localStorage.getItem(WEB_LOCALE) || 'en-GB';
    // use the corresponding angular locale
    const angularLocale = await import(
      /* webpackInclude: /(en-GB|de-CH)\.js$/ */
      `@angular/common/locales/${localeId}.js`);
    // fetch the translations
    const translations: any = await httpClient.get(`/assets/i18n/${localeId}.json`).toPromise();
    return i18nService.initialize(localeId, angularLocale.default, translations);
  };

  return initAsync;
}
```

Modify values in the translation JSON files inside the assets folder and check they are correctly translated in the application.

### 5.4 Extract translation keys

In the publicly available [UI-SDK documentation](https://docs.avaloq.com/ui-sdk/), you can read about the i18n extract and combine tools. With them you can extract the different translation keys and default values from banklets and libraries, and combine them in the application assets.

## Definition of done

* The Internationalization (i18n) process is clear
* The application locale can be switched from English to German

Before moving to the next step, commit your changes locally (so you can check your incremental changes), or switch to the `step5` branch of this repository.

## Prev/Next steps
* [Step 4. Configuration of Banklets](./step4.md)
* [Step 6. Modify theme](./step6.md)
