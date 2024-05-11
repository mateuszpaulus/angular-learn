import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient} from "@angular/common/http";
import {map, switchMap, withLatestFrom} from "rxjs";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";

import {RecipeModel} from "../recipe.model";
import * as RecipesActions from "./recipe.actions";
import * as fromApp from "../../store/app.reducer";

@Injectable()
export class RecipeEffects {

  fetchRecipes = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
          const http = this.http
            .get<RecipeModel[]>(
              'https://angular-recipes-learn-11ce1-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
            );
          console.log(http)
          return http
          // return this.http
          //   .get<RecipeModel[]>(
          //     'https://angular-recipes-learn-11ce1-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
          //   );
        }),
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        map(recipes => {
          return new RecipesActions.SetRecipes(recipes);
        })
      ),
  );

  storeRecipes = createEffect(() =>
      this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
          return this.http
            .put('https://angular-recipes-learn-11ce1-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipesState.recipes)

        })),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>) {
  }
}
