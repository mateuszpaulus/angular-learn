import {Component, OnDestroy, OnInit,} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

import {RecipeModel} from "../recipe.model";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() recipeWasSelected = new EventEmitter<RecipeModel>();
  // recipes: RecipeModel[] = [
  //   new RecipeModel('test1', 'desc', 'https://marketplace.canva.com/EAFjF3L3SYk/2/0/1600w/canva-grey-beige-minimalist-apple-pie-recipe-card-FWhb_7OLPUY.jpg'),
  //   new RecipeModel('test', 'desc', 'https://marketplace.canva.com/EAFjF3L3SYk/2/0/1600w/canva-grey-beige-minimalist-apple-pie-recipe-card-FWhb_7OLPUY.jpg')
  // ];
  recipes: RecipeModel[];
  subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: RecipeModel[]) => {
        this.recipes = recipes
      }
    );
    this.recipes = this.recipeService.getRecipes();
  };

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  };

  // onRecipeSelected(recipeEl: RecipeModel) {
  //   this.recipeWasSelected.emit(recipeEl);
  // };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  };
}
