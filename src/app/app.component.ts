import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

//## To Use BootStrap we need to Inform Angular in ANGULAR.JSON File in STYLES[]
   //-- "node_modules/bootstrap/dist/css/bootstrap.min.css"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor( private authService: AuthService ) {}

  // For Auto-Login
  ngOnInit(): void {
    this.authService.autoLogin();
  }
  
  // // After Adding Observables we Dont need this 
  // loadedFeatue = 'recipe';

  // // onNavigate(), function will NAVIGATE different LINKS
  // onNavigate(feature:  string) {
  //   this.loadedFeatue = feature;
  // }
}
