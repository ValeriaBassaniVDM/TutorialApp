import { Component, output, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../app.component';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { setUser } from './reducer/auth.actions';
import { selectIsAuthenticated } from './reducer/auth.selector';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, NgIf, AsyncPipe],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})

export class AuthComponent {
  auth = output<User>()
  users: User[] = []
  ciao: String = ""
  dataUsers: User[] = []

  user$: Observable<User>

  constructor(
    private readonly apollo: Apollo,
    private router: Router,
    private authService: AuthService,
    private store: Store<{ user: User }>) {
    this.user$ = store.select('user')
  }

  error: string | null = ""
  //constructor(private router: Router,private authService: AuthService) {}

  // onSubmit(form:NgForm){
  //   this.apollo
  //   .watchQuery({
  //     query: gql`
  //       {
  //         allPeople(first: 4) {
  //           edges {
  //             node {
  //               name
  //               birthYear
  //               id
  //             }
  //           }
  //         }
  //       }
  //     `,
  //   })
  //   .valueChanges.subscribe((result: any) => {
  //     const edges = result?.data?.allPeople?.edges || [];
  //     const { name } = form.value;
  //     for (let i = 0; i < edges.length; i++) {
  //       if(edges[i].node.name==name){
  //         const user: User=({
  //           id: edges[i].node.id,
  //           name: edges[i].node.name,
  //           birthDate: edges[i].node.birthYear,
  //           tasks:[]
  //         })
  //         this.error=null
  //         this.authService.setUser(edges[i].node);
  //         this.router.navigate(['/task',"Home"]);
  //       } 
  //     }
  //     if(this.error!=null){
  //       this.error="Utente non trovato"
  //     }
  //   });
  //   // const { name } = form.value;
  //   // const user = this.dataUsers.find(u => u.name === name);
  //   // console.log(user);
  //   // if(user){
  //   //   this.error=null
  //   //   this.authService.setUser(user);
  //   //   this.router.navigate(['/task',"Home"]);
  //   // }else{
  //   //   this.error="Utente non trovato"
  //   // }
  //   // form.reset();
  // }

  onSubmit(form: NgForm) {
    this.users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    const { name, lastname } = form.value;
    const user = this.users.find(u => u.name === name && u.lastname === lastname) as User;
    if (user) {
      this.error = null
     // this.store.dispatch(setUser({ user: user }))
      this.authService.setUser(user);
      this.router.navigate(['/taskmenu/task', "Home"]);
    } else {
      this.error = "Utente non trovato"
    }
    form.reset();
    // this.user$ = this.store.pipe(select(selectUser));
    // Ottieni lo stato di autenticazione
    // this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));

  }

}
