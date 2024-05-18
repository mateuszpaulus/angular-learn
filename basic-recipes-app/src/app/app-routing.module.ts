import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.module').then((mod) => mod.RecipesModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(
        (mod) => mod.ShoppingListModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((mod) => mod.AuthModule),
  },

  // {
  //   path: 'recipes',
  //   component: RecipesComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     {
  //       path: '',
  //       component: RecipeStartComponent,
  //     },
  //     {
  //       path: 'new',
  //       component: RecipeEditComponent,
  //     },
  //     {
  //       path: ':id',
  //       component: RecipeDetailComponent,
  //       resolve: [RecipesResolverService]
  //     }, {
  //       path: ':id/edit',
  //       component: RecipeEditComponent,
  //       resolve: [RecipesResolverService]
  //     },
  //   ]
  // },
  // {
  //   path: 'shopping-list', component: ShoppingListComponent,
  // },
  // {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
