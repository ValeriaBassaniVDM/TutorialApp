import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Character } from "./films.component";

@Injectable({
    providedIn: 'root'
})

export class FilmService {
    private charSubject = new BehaviorSubject<Character | undefined>(undefined);

    getCharObservable(): Observable<Character | undefined> {
        const character = JSON.parse(localStorage.getItem('actualChar') || 'null') as Character | null;
        if (character) {
            this.charSubject.next(character);
        }
        return this.charSubject.asObservable();
    }

    setChar(character: Character | undefined) {
        if (character) {
            localStorage.setItem("actualChar", JSON.stringify(character))
        } else {
            localStorage.removeItem("actualChar")
        }
        this.charSubject.next(character);
    }

    getChar(): Character | undefined {
        const character = JSON.parse(localStorage.getItem('actualChar') || '') as Character;
        if (character) {
            return character
        }
        return undefined;
    }

}