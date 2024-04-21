import {Component, EventEmitter, Output} from '@angular/core';
import {RecipeModel} from "../recipe.model";


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<RecipeModel>();
  recipes: RecipeModel[] = [
    new RecipeModel('test1', 'desc', 'https://marketplace.canva.com/EAFjF3L3SYk/2/0/1600w/canva-grey-beige-minimalist-apple-pie-recipe-card-FWhb_7OLPUY.jpg'),
    new RecipeModel('test', 'desc', 'https://marketplace.canva.com/EAFjF3L3SYk/2/0/1600w/canva-grey-beige-minimalist-apple-pie-recipe-card-FWhb_7OLPUY.jpg')
  ];

  onRecipeSelected(recipeEl: RecipeModel) {
    this.recipeWasSelected.emit(recipeEl);
  };
}
