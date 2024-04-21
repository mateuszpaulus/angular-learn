import {Component} from '@angular/core';
import {IngredientModel} from "../shared/ingredient.model";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {
  ingredients: IngredientModel[] = [
    new IngredientModel('Apples', 5),
    new IngredientModel('Tomatoes', 10)
  ];

  onIngredientAdded(ingredient: IngredientModel) {
    this.ingredients.push(ingredient);
  };
}
