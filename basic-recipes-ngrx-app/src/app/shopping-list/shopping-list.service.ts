import {Subject} from "rxjs";

import {IngredientModel} from "../shared/ingredient.model";

export class ShoppingListService {
  // ingredientsChange = new EventEmitter<IngredientModel[]>();
  ingredientsChange = new Subject<IngredientModel[]>();
  startedEditing = new Subject<number>();

  private ingredients: IngredientModel[] = [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  };

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
  };

  updateIngredient(index: number, newIngredient: IngredientModel) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChange.next(this.ingredients.slice());
  };

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChange.next(this.ingredients.slice());
  };
}
