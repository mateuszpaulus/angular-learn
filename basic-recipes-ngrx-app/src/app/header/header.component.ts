import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Subscription} from 'rxjs';
import {Store} from "@ngrx/store";

import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import * as fromApp from '../store/app.reducer'
import * as AuthActions from "../auth/store/auth.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    this.userSub = this.store
      .select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
      })
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  };

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  };

  onLogout() {
    this.store.dispatch(new AuthActions.Logout())
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
