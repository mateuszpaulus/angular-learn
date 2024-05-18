import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    //
    // AuthComponent,
    //
    // DropdownDirective,
    // LoadingSpinnerComponent,
    // AlertComponent,
    // PlaceholderDirective
    //
    // ShoppingListComponent,
    // ShoppingEditComponent,
    // RecipesComponent,
    // RecipeDetailComponent,
    // RecipeListComponent,
    // RecipeItemComponent,
    // RecipeStartComponent,
    // RecipeEditComponent,
  ],
  imports: [
    BrowserModule,
    NgOptimizedImage,
    AppRoutingModule,
    HttpClientModule,
    // RecipesModule,
    // ShoppingListModule,
    SharedModule,
    CoreModule,
    // AuthModule
    // FormsModule,
    // ReactiveFormsModule,
  ],
  providers: [
    // ShoppingListService,
    // RecipeService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptorService,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent],
  // entryComponents: [
  //   AlertComponent
  // ]
})
export class AppModule {}
