import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';

import * as fromApp from './store/app.reducer';
import * as AuthActions from '../app/auth/store/auth.actions';

//## To Use BootStrap we need to Inform Angular in ANGULAR.JSON File in STYLES[]
   //-- "node_modules/bootstrap/dist/css/bootstrap.min.css"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor( private authService: AuthService, private store: Store<fromApp.AppState> ) {}

  // For Auto-Login
  ngOnInit(): void {
    // Through Services
    // this.authService.autoLogin();

    // Through NgRx
    this.store.dispatch(new AuthActions.AutoLogin());
  }
  
  // // After Adding Observables we Dont need this 
  // loadedFeatue = 'recipe';

  // // onNavigate(), function will NAVIGATE different LINKS
  // onNavigate(feature:  string) {
  //   this.loadedFeatue = feature;
  // }
}
