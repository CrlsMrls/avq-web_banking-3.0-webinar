import {Component} from '@angular/core';

export const WEB_LOCALE = 'web-banking-locale';

@Component({
  selector: 'app-locale-selector',
  templateUrl: './locale-selector.component.html',
  styleUrls: ['./locale-selector.component.scss'],
})
export class LocaleSelectorComponent {
  onChangeLocale(locale: string) {
    window.localStorage.setItem(WEB_LOCALE, locale);
    window.location.reload();
  }
}
