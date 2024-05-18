import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
  // providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  // selectedRecipe: RecipeModel;

  constructor() {}

  ngOnInit() {
    // this.recipeService.recipeSelected
    //   .subscribe(
    //     (recipe: RecipeModel) => {
    //       this.selectedRecipe = recipe;
    //     }
    //   );
  }
}
