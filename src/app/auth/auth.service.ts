import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

// For Environment Variables to Load from environment.ts and prod.ts and Replace the key value with this 
import { environment } from "src/environments/environment";

// This is the Response that we will get from FIREBASE after the SignUp/Login Request
// The Response Data for SignUp and Login is almost same, with the ONLY difference is the REGISTERED key which is the response for the Login
// EXPORT interface to use with OBSERVABLES
export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    // Add a ? with this key i.e making it Optional because it's present in Login and Not in SignUp ResponseData
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    // We use BehaviorSubject here to Store and also UPDATE the Token with Every Update 
    user = new BehaviorSubject<User>(null);

    // To store the Token Expiration
    private tokenExpirationTimer: any;

    // The HttpClient
    constructor( private http: HttpClient,
        // Inject router to navigate after Logout
        private router: Router ) {}

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey, {
            email: email,
            password: password,
            returnSecureToken: true
        })
        // Pipe the HandleError Method for SignUp
        // Use the TAP Operator to Create a USER
        .pipe(catchError(this.handleError), tap( (resData) => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    // Login Process
    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey, {
            email: email,
            password: password,
            returnSecureToken: true
        })
        // Pipe the HandleError Method for Login
        .pipe(catchError(this.handleError), tap( (resData) => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    // To Retrive the Stored data from localStorage
    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData) {
            return;
        }
        const loadedUser = new User(
            userData.email, 
            userData.id, 
            userData._token,
            // Convert it into a Date Format 
            new Date(userData._tokenExpirationDate));

        // Check if the User has a Valid Token
        if(loadedUser.token) {
            this.user.next(loadedUser);

            // calling the AutoLogout method
            const expirationDuration =  new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        } 
    }

    // To logout the User 
    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        
        // Clear the Snapshot after logout i.e user data from loaclStorage
        localStorage.removeItem('userData');

        // Check if the User Logouts Manually or Not
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    // Method to Auto-Logout after the Token Expires
    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout( () => {
            this.logout();
        }, expirationDuration)
    }

    // Handling the Login User
    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
            
        // This is the expirationDate of Token in Miliseconds.
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
            const user = new User(
                email, 
                userId, 
                token, 
                expirationDate);
                
                //use next
                this.user.next(user);
                // calling the AutoLogout method 
                this.autoLogout(expiresIn * 1000);
        
                // Store the User Data in the Local Storage for Auto-Login
                localStorage.setItem('userData', JSON.stringify(user));
    }

    // Method Handling Error For Both SignUp/Login
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An Unknown error occured!';
            if(!errorRes.error || !errorRes.error.error) {
                return throwError(errorMessage);
            }
             // For Different Types of errors we Use Switch Case
             switch(errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email exists already.';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'The password is Invalid.'
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'This email does not exists.';
                    break;  
            }
            return throwError(errorMessage);
        }

}