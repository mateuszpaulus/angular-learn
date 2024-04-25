import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs";

import {RecipeService} from "../recipes/recipe.service";
import {RecipeModel} from "../recipes/recipe.model";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipesService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipesService.getRecipes();
    return this.http
      .put('https://angular-recipes-learn-11ce1-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
      .subscribe(response => {
        console.log(response)
      });
  }

  fetchRecipes() {
    return this.http
      .get<RecipeModel[]>('https://angular-recipes-learn-11ce1-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipesService.setRecipes(recipes);
        })
      )
    // instead of tap
    // .subscribe((response) => {
    //   this.recipesService.setRecipes(response);
    // });
  };
}
