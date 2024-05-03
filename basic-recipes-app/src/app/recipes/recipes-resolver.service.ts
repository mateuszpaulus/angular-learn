import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";

import {RecipeModel} from "./recipe.model";
import {DataStorageService} from "../shared/data-storage.service";
import {RecipeService} from "./recipe.service";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<RecipeModel[]> {

  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipeService
  ) {
  }

  resolve(
    // route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ) {
    const recipes = this.recipesService.getRecipes();

    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
