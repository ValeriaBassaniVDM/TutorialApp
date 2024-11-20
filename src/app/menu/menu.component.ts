import { Component, DestroyRef, inject, Input, OnInit, output } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../app.component';
import { AuthService } from '../auth/auth.service';
import { AlertComponent } from '../alert/alert.component';
import { Apollo, gql } from 'apollo-angular';
import { FilmsComponent } from "../films/films.component";

export interface Product{
  id:string,
  title:string,
  director:string
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, FilmsComponent, RouterLinkActive, AlertComponent, NgClass, FilmsComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  //@Input() user!:User

  categories: string[] = ["Home", "Work", "School"];
  users: User[] = []
  user: User | undefined;
  dataUsers: User[] = []

  constructor(private readonly apollo: Apollo, private authService: AuthService) { }

  products:Product[]=[]

  ngOnInit() {
    this.authService.getUserObservable().subscribe(user => {
      this.user = user;
    });
    // if(this.user){
    //   console.log(this.user?.id);

    //   this.apollo
    //   .watchQuery({
    //     query: gql`
    //     query GetUserFilms($id:ID){
    //     person(id: $id) {
    //       filmConnection {
    //         edges {
    //             node {
    //                 title
    //                 id 
    //                 director
    //                 }
    //                }
    //             }
    //           }
    //       }
    //   `,
    //   variables:{
    //     id:this.user.id
    //   }
    //   })
    //   .valueChanges.subscribe((result: any) => {
    //     const edges = result?.data?.person?.filmConnection?.edges || [];
    //     this.products = edges.map((edge: any) => ({
    //       id: edge.node.id,
    //       title: edge.node.title,
    //       director: edge.node.director,
    //     }));
    //   });
    // }
  }

  categoryCount(category: string): number {
    if (this.user) {
      this.users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
      let count = 0;
      const i = this.users.findIndex(u => u.id === this.user!.id);
      this.users[i].tasks.forEach(task => {
        if (task.category === category) {
          count++;
        }
      });
      return count;
    }
    return 0
  }

  message: string | null = null

  setAlert() {
    this.message = "Sure to logout?"
  }

  handleAlert() {
    this.message = null
  }
}
