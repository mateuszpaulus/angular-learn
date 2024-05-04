import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

import {RecipeModel} from "./recipe.model";
import {IngredientModel} from "../shared/ingredient.model";
import {Store} from "@ngrx/store";
import * as ShoppingListActions
  from "../shopping-list/store/shopping-list.actions"
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer'

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<RecipeModel[]>();
  private recipes: RecipeModel[] = [];

  constructor(
    private store: Store<fromShoppingList.AppState>
  ) {
  }

  setRecipes(recipes: RecipeModel[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  };

  getRecipe(index: number) {
    return this.recipes[index];
  };

  addIngredientsToShoppingList(ingredients: IngredientModel[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients))
    // Alternative syntax:
    // this.store.dispatch(ShoppingListActions.AddIngredients({ ingredients: ingredients }));
  };

  addRecipe(recipe: RecipeModel) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  };

  updateRecipe(index: number, newRecipe: RecipeModel) {
    this.recipes[index] = newRecipe;
  };

  onDeleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
