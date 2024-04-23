import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {RecipesComponent} from "./recipes/recipes.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {
  RecipeStartComponent
} from "./recipes/recipe-start/recipe-start.component";
import {
  RecipeDetailComponent
} from "./recipes/recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {
    path: 'recipes', component: RecipesComponent, children: [
      {
        path: '',
        component: RecipeStartComponent,
        // resolve: {server: ServerResolver}
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        // canDeactivate: [CanDeactivateGuard]
      }, {
        path: ':id/edit',
        component: RecipeEditComponent,
      },
      {
        path: 'new',
        component: RecipeEditComponent,
      }
    ]
  },
  {
    path: 'shopping-list', component: ShoppingListComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}