import { User } from "../user.model";

// Access all Actions
import * as AuthActions from './auth.actions';

// General Interface for Actions
export interface State {
  user: User;
}

// initialState of Component before it is Changed
// Always a JS Object
const initialState: State = {
  user: null
}

// Creating reducer Function
// Always Requires Two Arguments for ngRx Package, with Default Values
//## FIRST, state -- the Current State before it was changed
// ## SECOND, action -- to Update the Component State
export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  // Action to Update the State
  // Switch Case for Multiple ActionsTypes
  switch (action.type) {
     // LOGIN is Identifier
    // Login the User
    case AuthActions.LOGIN:
      // Create a New User
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      // Update Immutably i.e Copy Old state with SPREAD operator and Update
      return {
        ...state,
        user: user
      };
    
       // LOGOUT is Identifier
    // Logout the User
    case AuthActions.LOGOUT:
      // Update Immutably i.e Copy Old state with SPREAD operator and Update
      return {
        ...state,
        user: null
      }
      // EXTREMELY IMPORTANT DEFAULT CASE
      // This Handles the Actions Not Present in This Reducer i.e If a Action is Dispatched from Shopping List not Related to Auth, This Default Case is Initialized to Maintain the AppState.
      default:
        return state;
  }
}