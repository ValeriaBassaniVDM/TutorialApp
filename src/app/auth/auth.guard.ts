import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map } from "rxjs/operators";
import { select, Store } from "@ngrx/store";
import { selectUser } from "./reducer/auth.selector";

@Injectable({
    providedIn: 'root'
})
export class AuthGard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
        private store: Store) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
    ): Observable<boolean | UrlTree> {
        return this.authService.getUserObservable().pipe(
        //return this.store.pipe(select(selectUser),
            map(user  => {                
                const isAuth = !!user;  //se uso service
                //const isAuth = !!user.id; se uso selector e store        
                if (isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/auth'])
            }),

            //in map(user=>{
            // return !!user; //modo base
            // modi migliori: modo top:  return un UrlTree che se user non è autenticato manda a login
            //})

            //modo alternativo ( meno efficiente): se non loggato rimanda alla pagina di autenticazione
            // tap(isAuth=>{
            //     if(!isAuth){
            //         this.router.navigate(['/auth'])
            //     }
            // })
        )
    }
}