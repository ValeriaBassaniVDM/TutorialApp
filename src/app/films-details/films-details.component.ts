import { Component, DestroyRef, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Character } from '../films/films.component';

interface Film {
  id: string,
  title: string,
  director: string
}

@Component({
  selector: 'app-films-details',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './films-details.component.html',
  styleUrl: './films-details.component.css'
})

export class FilmsDetailsComponent {

  constructor(private readonly apollo: Apollo) { }

  private destroyRef = inject(DestroyRef)
  private activatedRoute = inject(ActivatedRoute)
  otherChar: Character[] = []

  films: Film[] = []
  vehicles: string[] = []

  ngOnInit(): void {
    const subsciption = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.apollo
          .watchQuery({
            query: gql`
              query GetPersonFilms($id:ID!)
              {
                person(id: $id) {
                    filmConnection {
                        edges {
                            node {
                                title
                                id
                                director
                            }
                        }
                    }
                    vehicleConnection {
                      vehicles {
                          name
                      }
                    }
                }
            }
           `, variables: {
              id: paramMap.get('id')
            }
          })
          .valueChanges.subscribe({
            next: (result: any) => {
              const edges = result?.data?.person?.filmConnection.edges || [];
              this.films = edges.map((edge: { node: any }) => edge.node);
              const vehicleNames = result?.data?.person?.vehicleConnection?.vehicles || [];
              this.vehicles = vehicleNames.map((vehicle: { name: any; }) => vehicle.name) ;
            },
            error: (error) => {
              console.error('Error fetching films:', error);
            },
          });
      }
    })
    this.destroyRef.onDestroy(() => subsciption.unsubscribe())
  }

  onLess(){
    this.otherChar=[]
  }

  currentFilm:Film|undefined=undefined
  onMore(film: Film) {
    this.currentFilm=film
    this.apollo
      .watchQuery({
        query: gql`
            query GetFilmsChar($id: ID!) {
              film(id: $id) {
                characterConnection {
                  edges {
                    node {
                      name
                    }
                  }
                }
              }
            }
           `, variables: {
          id: film.id
        }
      })
      .valueChanges.subscribe({
        next: (result: any) => {
          this.otherChar = result?.data?.film?.characterConnection?.edges.map(
            (edge: any) => edge.node.name
          );
        },
        error: (error) => {
          console.error('Error fetching characters:', error);
        },
      });
  }

  message: string | null = null

  setAlert() {
    this.message = "Sure to logout?"
  }

  handleAlert() {
    this.message = null
  }  


}
