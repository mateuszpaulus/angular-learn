import {
  Component, OnDestroy, OnInit, ViewChild,
} from '@angular/core';
import {Subscription} from "rxjs";
import {NgForm} from "@angular/forms";
import {Store} from '@ngrx/store';

import {IngredientModel} from "../../shared/ingredient.model";

import * as ShoppingListActions from "../store/shopping-list.actions"
import * as fromShoppingList from '../store/shopping-list.reducer'

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('form', {static: false}) shoppingListForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItem: IngredientModel;

  constructor(
    private store: Store<fromShoppingList.AppState>) {
  }

  ngOnInit() {
    this.subscription = this.store
      .select('shoppingList')
      .subscribe(
        stateData => {
          if (stateData.editedIngredient) {
            this.editMode = true;
            this.editedItem = stateData.editedIngredient;
            this.shoppingListForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            });
          } else {
            this.editMode = false;
          }
        });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new IngredientModel(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(
          newIngredient
        )
      );
      // Alternative syntax:
      // this.store.dispatch(
      //   ShoppingListActions.UpdateIngredient({
      //     ingredient: newIngredient,
      //   })
      // );
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      // Alternative syntax:
      // this.store.dispatch(
      //   ShoppingListActions.AddIngredient({ ingredient: newIngredient })
      // );
    }

    this.editMode = false;
    form.reset();
  };

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
    // Alternative syntax:
    // this.store.dispatch(ShoppingListActions.StopEdit());
  };

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient())
    // Alternative syntax:
    // this.store.dispatch(ShoppingListActions.DeleteIngredient());
    this.onClear();
  };

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
    // Alternative syntax:
    // this.store.dispatch(ShoppingListActions.StopEdit());
  };
}
