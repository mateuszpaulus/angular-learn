import {Component, EventEmitter, Input, Output} from '@angular/core';

import {RecipeModel} from '../../recipe.model'

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  @Input() recipe: RecipeModel;

  @Output() recipeSelected = new EventEmitter<RecipeModel>();


  onSelected() {
    this.recipeSelected.emit(this.recipe);
  };
}
