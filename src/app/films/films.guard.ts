import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { FilmService } from "./films.service";

@Injectable({
    providedIn: 'root'
})
export class FilmsGuard implements CanActivate {

    constructor(private filmService: FilmService,private router:Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        router: RouterStateSnapshot
    ): Observable<boolean | UrlTree> {
        return this.filmService.getCharObservable().pipe(
            map(character => {
               // return !!user; //modo base
               // modi migliori: modo top:  return un UrlTree che se user non è autenticato manda a login
                const isAuth= !!character;
                if(isAuth){
                    return true;
                }
                return this.router.createUrlTree(['/character'])
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