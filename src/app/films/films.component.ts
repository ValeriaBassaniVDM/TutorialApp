import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { FilmService } from './films.service';

export interface Character {
  id: string,
  name: string,
  birthDate: string,
}

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [FormsModule, NgIf,RouterOutlet],
  templateUrl: './films.component.html',
  styleUrl: './films.component.css'
})

export class FilmsComponent {

  constructor(private readonly apollo: Apollo, private router: Router, private filmService: FilmService) { }

  error: string | null = ""

  onSubmit(form: NgForm) {
    this.apollo
      .watchQuery({
        query: gql`
        {
          allPeople {
            edges {
              node {
                name
                birthYear
                id
              }
            }
          }
        }
      `,
      })
      .valueChanges.subscribe((result: any) => {
        const edges = result?.data?.allPeople?.edges || [];
        const { name } = form.value;
        for (let i = 0; i < edges.length; i++) {
          if (edges[i].node.name == name) {
            // const character : Character = ({
            //   id: edges[i].node.id,
            //   name: edges[i].node.name,
            //   birthDate: edges[i].node.birthYear,
            // })
            this.error = null
            this.filmService.setChar(edges[i].node);
            this.router.navigate(['/starwars/character', edges[i].node.id]);
          }
        }
        if (this.error != null) {
          this.error = "Utente non trovato"
        }
      });
  }
}
