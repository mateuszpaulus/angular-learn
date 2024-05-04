import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgOptimizedImage} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from "@ngrx/store"

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";
import {shoppingListReducer} from "./shopping-list/store/shopping-list.reducer";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    NgOptimizedImage,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot({shoppingList: shoppingListReducer}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
