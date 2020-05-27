import { Component } from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(router: Router) {
    // Workaround for angular router not sending extras.state on back navigation.
    // See https://github.com/angular/angular/issues/28108
    router.events
      .pipe(
        filter((e) => e instanceof NavigationStart),
        map((e) => e as NavigationStart),
        filter((e) => e.navigationTrigger === 'popstate')
      )
      .subscribe((e) => {
        router.getCurrentNavigation().extras.state = {
          ...e.restoredState,
          navigationId: e.id,
        };
      });
  }
  
}
