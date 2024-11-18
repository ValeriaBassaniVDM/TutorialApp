import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthGard implements CanActivate {

    constructor(private authService: AuthService,private router:Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
    ): Observable<boolean | UrlTree> {
        return this.authService.getUserObservable().pipe(
            map(user => {
               // return !!user; //modo base
               // modi migliori: modo top:  return un UrlTree che se user non è autenticato manda a login
                const isAuth= !!user;
                if(isAuth){
                    return true;
                }
                return this.router.createUrlTree(['/auth'])
            }),
            //modo alternativo ( meno efficiente): se non loggato rimanda alla pagina di autenticazione
            // tap(isAuth=>{
            //     if(!isAuth){
            //         this.router.navigate(['/auth'])
            //     }
            // })
        )
    }
}