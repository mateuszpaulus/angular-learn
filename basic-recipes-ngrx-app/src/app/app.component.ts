import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";

import {LoggingService} from "./logging.service";
import * as fromApp from './store/app.reducer'
import * as AuthActions from './auth/store/auth.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin());
    // Alternative syntax:
    // this.store.dispatch(AuthActions.autoLogin());
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
}
