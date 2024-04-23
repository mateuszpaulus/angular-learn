import {Subject} from "rxjs";

import {IngredientModel} from "../shared/ingredient.model";

export class ShoppingListService {
  // ingredientsChange = new EventEmitter<IngredientModel[]>();
  ingredientsChange = new Subject<IngredientModel[]>();

  private ingredients: IngredientModel[] = [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: IngredientModel) {
    this.ingredients.push(ingredient);
    // this.ingredientsChange.emit(this.ingredients.slice());
    this.ingredientsChange.next(this.ingredients.slice());
  };

  addIngredients(ingredients: IngredientModel[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    // this.ingredientsChange.emit(this.ingredients.slice());
    this.ingredientsChange.next(this.ingredients.slice());
  }
}
