import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {IngredientModel} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  // ingredients: IngredientModel[] = [
  //   new IngredientModel('Apples', 5),
  //   new IngredientModel('Tomatoes', 10)
  // ];
  ingredients: IngredientModel[];
  private ingredientChangeSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientChangeSub = this.shoppingListService.ingredientsChange.subscribe(
      (ingredients: IngredientModel[]) =>
        this.ingredients = ingredients
    );
  };

  ngOnDestroy() {
    this.ingredientChangeSub.unsubscribe();
  }

  // onIngredientAdded(ingredient: IngredientModel) {
  //   this.ingredients.push(ingredient);
  // };
}
