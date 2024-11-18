import { Component } from '@angular/core';
import { Task } from './input-data/input-data.model';
import { MenuComponent } from './menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { Apollo, gql, ApolloModule } from 'apollo-angular';

export interface User {
  id: number,
  name: string,
  lastname: string,
  tasks: Task[]
}

@Component({
  selector: 'app-root',
  //standalone: false, //sandalone false, cosi uso i modules
  // imports: [MenuComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  users: User[] = [];

  dataUsers: User[] = []
  constructor(private readonly apollo: Apollo) { }

  // ngOnInit(): void {
  //   // if (!localStorage.getItem('users')) {
  //   //   this.populateLocalStorage();
  //   // }else{
  //   //   this.users = JSON.parse(localStorage.getItem('users') || '[]') as User[];
  //   // }
  //   this.apollo
  //     .watchQuery({
  //       query: gql`
  //         {
  //           allPeople(first: 4) {
  //             edges {
  //               node {
  //                 name
  //                 birthYear
  //                 id
  //               }
  //             }
  //           }
  //         }
  //       `,
  //     })
  //     .valueChanges.subscribe((result: any) => {

  //       const edges = result?.data?.allPeople?.edges || [];

  //       this.dataUsers = edges.map((edge: any) => ({
  //         id: edge.node.id, // Converte l'ID in numero
  //         name: edge.node.name,
  //         bithDate: edge.node.birthYear,
  //         tasks: [],
  //       }));

  //       console.log(this.dataUsers);


  //       // this.rates = result.data?.rates;
  //       // this.loading = result.loading;
  //       // this.error = result.error;
  //     });
  // }

  populateLocalStorage() {
    const users: User[] = [
      {
        id: 1, name: 'Alice', lastname: 'Smith', tasks: [
          { id: 1, name: 'Task 1', status: true, category: 'Work', date: new Date(2024, 10, 11) },
          { id: 2, name: 'Task 2', status: false, category: 'School', date: new Date(2024, 9, 4) }
        ]
      },
      {
        id: 3, name: 'Charlie', lastname: 'Brown', tasks: [
          { id: 4, name: 'Task 4', status: true, category: 'Work', date: new Date(2024, 9, 11) },
          { id: 5, name: 'Task 5', status: false, category: 'School', date: new Date(2024, 9, 18) },
          { id: 6, name: 'Task 6', status: true, category: 'Home', date: new Date(2024, 11, 11) }
        ]
      }
    ];
    localStorage.setItem('users', JSON.stringify(users));
  }


  populateLocalStorageWithTasks() {
    const tasks: Task[] = [
      { id: 1, name: 'Task 1', status: false, category: 'Work' },
      { id: 2, name: 'Task 2', status: true, category: 'Home' },
      { id: 3, name: 'Task 3', status: false, category: 'School' },
      { id: 4, name: 'Task 4', status: true, category: 'Work' },
      { id: 5, name: 'Task 5', status: false, category: 'Home' }
    ];
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

}
