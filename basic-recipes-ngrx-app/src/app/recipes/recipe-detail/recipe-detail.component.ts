import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map, switchMap} from "rxjs";

import {RecipeModel} from "../recipe.model";
import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';
import * as ShoppingListActions
  from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  recipe: RecipeModel;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(map(params => {
        return +params['id'];
      }), switchMap(id => {
        this.id = id;
        return this.store.select('recipes');
      }),
      map(recipesState => {
          return recipesState.recipes.find((recipe, index) => {
              return index === this.id;
            }
          )
        }
      )
    )
      .subscribe(recipe => {
          this.recipe = recipe;
        }
      )
  }

  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  };

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  };

  onDeleteRecipe() {
    // this.recipeService.onDeleteRecipe(this.id);
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id))
    this.router.navigate(['/recipes']);
  };
}
