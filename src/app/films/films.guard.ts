import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
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
                const isAuth= !!character;
                if(isAuth){
                    return true;
                }
                return this.router.createUrlTree(['/character'])
            }),
        )
    }
}