import { Component, Input } from '@angular/core';

import { RecipeModel } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  @Input() recipe: RecipeModel;
  @Input() index: number;

  // @Output() recipeSelected = new EventEmitter<RecipeModel>();

  // constructor(private recipeService: RecipeService) {
  // }

  // onSelected() {
  //   this.recipeService.recipeSelected.emit(this.recipe);
  // };
}
