import {Component, EventEmitter, Input, Output} from '@angular/core';

import {RecipeModel} from '../../recipe.model'
import {RecipeService} from "../../recipe.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  @Input() recipe: RecipeModel;

  // @Output() recipeSelected = new EventEmitter<RecipeModel>();

  constructor(private recipeService: RecipeService) {
  }

  onSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  };
}