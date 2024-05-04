import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Store} from '@ngrx/store';

import {IngredientModel} from "../shared/ingredient.model";
import {LoggingService} from "../logging.service";
import * as fromShoppingList from './store/shopping-list.reducer'
import * as ShoppingListActions from './store/shopping-list.actions'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit {

  ingredients: Observable<{ ingredients: IngredientModel[] }>;

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromShoppingList.AppState>
  ) {
  }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!');
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
    // Alternative syntax:
    // this.store.dispatch(ShoppingListActions.StartEdit({ index: index }));
  };
}
