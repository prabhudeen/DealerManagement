import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { SessionService } from "./session.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private router: Router,
                    private sessionService: SessionService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;  
        return this.verifyLogin(url);
    }

    verifyLogin(url): boolean {
        if(!this.isLoggedIn()){
            this.router.navigate(['/login']);
            return false;
        }
        else if(this.isLoggedIn()){
            return true;
        }
    }

    isLoggedIn(): boolean {
        if(this.sessionService.get('userName')) {
            return true;
        } else {
            return false;
        }
    }
}