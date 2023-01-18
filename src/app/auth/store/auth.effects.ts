
// This Action is Different from the Store Actions
import { HttpClient } from '@angular/common/http';
import { Actions, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

// Access all Actions
import * as AuthActions from './auth.actions';
import { Injectable } from '@angular/core';

// Access the Firebase API-Key
import { environment } from 'src/environments/environment';

// This is the Response that we will get from FIREBASE after the SignUp/Login Request
// The Response Data for SignUp and Login is almost same, with the ONLY difference is the REGISTERED key which is the response for the Login
export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  // Add a ? with this key i.e making it Optional because it's present in Login and Not in SignUp ResponseData
  registered?: boolean;
}

// Add Injectable so that Actions can be Injected
@Injectable()
export class AuthEffects {
  // Login Effect Handler
  // We Dont need to Subscribe i.e NgRx will Subscribe for us.
  // Attach Decorator @Effect() to Make it a Effect and Inform NgRx about Effects
  // @Effect()
  authLogin = this.actions$.pipe(
    // ofType Operator Allows us to Filter Effects
    ofType(AuthActions.LOGIN_START),
    // switchMap Operator Allows us to Create new Observable by Taking Data from Another Observable
    switchMap( (authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey, {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
        }
      ).pipe(
        map( resData => {
          const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
          //Return Observable
          // Create Object
          return of(new AuthActions.login(
            {
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate: expirationDate
            }
          ));
        } ),
        catchError( error => {
        //Return Observable
        return of(); 
      } ) 
     )
    }),
    // Return a Action #Very important  
  );

  // This Action will give a Observable to react over these effects
  constructor( private actions$: Actions, private http: HttpClient ) {}
}
function Effect() {
  throw new Error('Function not implemented.');
}

