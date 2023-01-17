// THIS IS THE GLOBAL/ROOT Reducer for all other Stores reducers 

// MERGE the ShoppingList Reducer
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
// MERGE the Auth Reducer
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

// Entire Application State
export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
}

// ActionReducerMap is Required by the app.module i.e forRoot({})
export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,

}