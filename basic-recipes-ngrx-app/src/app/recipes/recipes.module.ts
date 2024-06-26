import {NgModule} from "@angular/core";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {
  RecipeItemComponent
} from "./recipe-list/recipe-item/recipe-item.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipesComponent} from "./recipes.component";
import {RouterModule} from "@angular/router";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {RecipesRoutingModule} from "./recipes-routing.module";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    RecipesComponent,
  ],
  imports: [
    RouterModule,
    // CommonModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
    NgOptimizedImage,
    SharedModule
  ],
  // exports: [
  //   RecipeDetailComponent,
  //   RecipeListComponent,
  //   RecipeItemComponent,
  //   RecipeStartComponent,
  //   RecipeEditComponent,
  //   RecipesComponent,
  // ]
})
export class RecipesModule {

}
