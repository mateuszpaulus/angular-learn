import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

import {RecipeModel} from "./recipe.model";
import {IngredientModel} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  // recipeSelected = new EventEmitter<RecipeModel>();
  recipesChanged = new Subject<RecipeModel[]>();
  private recipes: RecipeModel[] = [
    new RecipeModel('test1',
      'desc',
      'https://marketplace.canva.com/EAFjF3L3SYk/2/0/1600w/canva-grey-beige-minimalist-apple-pie-recipe-card-FWhb_7OLPUY.jpg',
      [
        new IngredientModel('Meet', 3),
        new IngredientModel('Meet', 3),
        new IngredientModel('Meet', 3),
      ]
    ),
    new RecipeModel('test',
      'desc',
      'https://marketplace.canva.com/EAFjF3L3SYk/2/0/1600w/canva-grey-beige-minimalist-apple-pie-recipe-card-FWhb_7OLPUY.jpg',
      [
        new IngredientModel('Meet', 3),
        new IngredientModel('Meet', 3),
        new IngredientModel('Meet', 3),
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice();
  };

  getRecipe(index: number) {
    return this.recipes[index];
  };

  addIngredientsToShoppingList(ingredients: IngredientModel[]) {
    this.shoppingListService.addIngredients(ingredients);
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
