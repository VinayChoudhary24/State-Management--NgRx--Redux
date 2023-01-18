import { Action } from "@ngrx/store";

// // This is the IDENTIFIER for Http Request
export const LOGIN_START = '[Auth] Login Start';

// This is a Standard Naming Convention
// [Auth] is Will Make Sure the Identifier is Unique Across the App
// This is the IDENTIFIER for user login
export const LOGIN = '[Auth] Login';

// This is the IDENTIFIER for user logout
export const LOGOUT = '[Auth] Logout';

//Describing the Action i.e Objects with type
// USer Login Action
export class login implements Action {
  // Requires a type
  // readonly TS Feature
  readonly type = LOGIN;

  // The Action to Attach Data
  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    }
    ) {}
}

//Describing the Action i.e Objects with type
// USer LogOut Action
export class logout implements Action {
  // Requires a type
  // readonly TS Feature
  readonly type = LOGOUT;
}

//Describing the Action i.e Objects with type
// USer Login Start i.e Http Request
export class LoginStart implements Action {
  // Requires a type
  // readonly TS Feature
  readonly type = LOGIN_START;

  // The Action to Attach Data
  constructor( public payload: {
    email: string;
    password: string;
  } ) {}
}


// Extra Export Required for the REDUCER Parameter
// With This the Reducer can Differentiate Between Different Actions
// Make Unions of Classes
export type AuthActions = login | logout;
