import {Component, OnDestroy, OnInit,} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map, pipe, Subscription} from "rxjs";
import {Store} from "@ngrx/store";

import {RecipeModel} from "../recipe.model";
import * as fromApp from '../../store/app.reducer'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: RecipeModel[];
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    this.subscription = this.store
      .select('recipes')
      .pipe(map((recipesState) => recipesState.recipes))
      .subscribe((recipes: RecipeModel[]) => {
          this.recipes = recipes
        }
      );
  };

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
  };
}
