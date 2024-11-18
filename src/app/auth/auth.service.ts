import { Injectable } from "@angular/core";
import { User } from "../app.component";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private userSubject = new BehaviorSubject<User | undefined>(undefined);

    getUserObservable(): Observable<User | undefined> {
        const user = JSON.parse(localStorage.getItem('actualUser') || 'null') as User | null;
        if (user) {
            this.userSubject.next(user);
        }
        return this.userSubject.asObservable();
    }

    setUser(user: User | undefined) {
        if (user) {
            localStorage.setItem("actualUser", JSON.stringify(user))
        } else {
            localStorage.removeItem("actualUser")
        }
        this.userSubject.next(user);
    }

    getUser(): User | undefined {
        const user = JSON.parse(localStorage.getItem('actualUser') || '') as User;
        if (user) {
            return user
        }
        return undefined;
    }

}