import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/Http-data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
    // To store the user State to Unsubscribe()
    private userSub: Subscription;

    // To Check is the User is LoggedIn or NOT
    isAuthenticated = false;

    // To access the Http Request 
    constructor( private dataStorageService: DataStorageService,
        // To TRACk the STATE of the User  
        private authService: AuthService ) {}

        // To Initialize the User State when page Loads
        ngOnInit(): void {
            this.userSub = this.authService.user.subscribe( (user) => {
                this.isAuthenticated = !user ? false : true;
                // this.isAuthenticated = !!user;
                // We can also replace this !user ? false : true; with !!user
                console.log(!user);
                // console.log(!!user)
            });
        }

    // add a Property
    // Create a Variable that will be LISTENED(@Output) by other Components, and EMIT the FEATURES
    // After routing we dont need this
    // @Output() featureSelected = new EventEmitter<string>();



    // This function will Fire the LINKS in the HEADER Section
    // After routing we dont need this
    // onSelect(feature: string) {
    //     this.featureSelected.emit(feature);
    // }

    // Store the Recipes to the Database by Click Save
    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    // Fetch the Recipes from the Database
    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    // logout the user by Click
    onLogout() {
        this.authService.logout();
    }

    // Unsubscribe the State of the User
    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}