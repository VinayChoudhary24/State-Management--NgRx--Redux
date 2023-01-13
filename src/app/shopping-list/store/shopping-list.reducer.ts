// NgRx - Redux reducers
import { Ingredient } from '../../shared/ingredients.model';

// Import EVERYTHING from Action File
import * as ShoppingListActions from './shopping-list.actions';

// initialState of Component before it is Changed
// Always a JS Object
const initialState = {
  ingredients: [
    // Here we Create the INSTANCE/BLUEPRINT of the ingredient.model class/Object with the 'new' Keyword
    new Ingredient('Apples', 13),
    new Ingredient('tomato', 13),
  ]
};

// Creating reducer Function
// Always Requires Two Arguments for ngRx Package, with Default Values
//## FIRST, state -- the Current State before it was changed
// ## SECOND, action -- to Update the Component State
export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
  // Action to Update the State
  // Switch Case for Multiple ActionsTypes
  switch (action.type) {
    // ADD_INGREDIENT is Identifier
    case ShoppingListActions.ADD_INGREDIENT:
    // Update Immutably i.e Copy Old state with SPREAD operator and Update
    return {
      ...state,
      ingredients: [...state.ingredients, action.payload]
    };
    default: 
    return state;
  }
}
