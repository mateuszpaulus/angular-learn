import {Component, OnInit} from '@angular/core';
import {IngredientModel} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit {

  // ingredients: IngredientModel[] = [
  //   new IngredientModel('Apples', 5),
  //   new IngredientModel('Tomatoes', 10)
  // ];
  ingredients: IngredientModel[]

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientsChange.subscribe(
      (ingredients: IngredientModel[]) =>
        this.ingredients = ingredients
    );
  };

  // onIngredientAdded(ingredient: IngredientModel) {
  //   this.ingredients.push(ingredient);
  // };
}
