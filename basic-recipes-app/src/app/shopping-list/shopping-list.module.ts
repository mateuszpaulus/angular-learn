import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    // CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        // path: 'shopping-list', component: ShoppingListComponent,
        path: '',
        component: ShoppingListComponent,
      },
    ]),
    SharedModule,
  ],
})
export class ShoppingListModule {}
