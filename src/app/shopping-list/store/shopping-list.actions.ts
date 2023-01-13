// All Different ActionsTypes defined Here
import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredients.model';

// This is a Standard Naming Convention
// This is the IDENTIFIER
export const ADD_INGREDIENT = 'ADD_INGREDIENT';

//Describing the Action i.e Objects with type
export class AddIngredient implements Action {
  // Requires a type
  // readonly TS Feature
  readonly type = ADD_INGREDIENT;

  // The Action
  constructor( public payload: Ingredient ) {}
}
