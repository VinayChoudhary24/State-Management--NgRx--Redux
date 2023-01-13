import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {

    // To access token
    constructor( private authService: AuthService ) {}

    // this intercept will Attach Token to all Outgoing Requests 
    // Interface Provided by Angular
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(take(1), 
        exhaustMap( (user) => {
            // To Check is the User is Present or Not
            if(!user) {
                return next.handle(req);
            }
        // clone the Request and Update
        const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)});
            return next.handle(modifiedReq);
        })
        );
    }
}